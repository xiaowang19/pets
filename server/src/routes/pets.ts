import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { petSchema } from '../validators/index.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const { category, status, limit = 20, offset = 0 } = req.query;
    
    let query = supabase
        .from('pets')
        .select(`
            *,
            owner:owner_id(id, name, avatar, role, response_rate)
        `)
        .order('created_at', { ascending: false });

    if (category) {
        query = query.eq('category', category);
    }

    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query.range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;

    res.json({
        success: true,
        data: data
    });
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { data, error } = await supabase
        .from('pets')
        .select(`
            *,
            owner:owner_id(id, name, avatar, role, response_rate)
        `)
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({
            success: false,
            error: '宠物不存在'
        });
    }

    res.json({
        success: true,
        data: data
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const validatedData = petSchema.parse(req.body);

    const { data, error } = await supabase
        .from('pets')
        .insert({
            ...validatedData,
            owner_id: userId
        })
        .select(`
            *,
            owner:owner_id(id, name, avatar, role, response_rate)
        `)
        .single();

    if (error) throw error;

    res.status(201).json({
        success: true,
        data: data
    });
}));

router.put('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    const validatedData = petSchema.partial().parse(req.body);

    const { data: pet } = await supabase
        .from('pets')
        .select('owner_id')
        .eq('id', id)
        .single();

    if (!pet || pet.owner_id !== userId) {
        return res.status(403).json({
            success: false,
            error: '无权修改此宠物信息'
        });
    }

    const { data, error } = await supabase
        .from('pets')
        .update(validatedData)
        .eq('id', id)
        .select(`
            *,
            owner:owner_id(id, name, avatar, role, response_rate)
        `)
        .single();

    if (error) throw error;

    res.json({
        success: true,
        data: data
    });
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: pet } = await supabase
        .from('pets')
        .select('owner_id')
        .eq('id', id)
        .single();

    if (!pet || pet.owner_id !== userId) {
        return res.status(403).json({
            success: false,
            error: '无权删除此宠物'
        });
    }

    const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id);

    if (error) throw error;

    res.json({
        success: true,
        message: '删除成功'
    });
}));

export default router;
