import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { adoptionApplicationSchema } from '../validators/index.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { status, limit = 20, offset = 0 } = req.query;

    let query = supabase
        .from('adoption_applications')
        .select(`
            *,
            history:application_history(*)
        `)
        .eq('applicant_id', userId)
        .order('created_at', { ascending: false });

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
    const userId = req.user.id;

    const { data, error } = await supabase
        .from('adoption_applications')
        .select(`
            *,
            history:application_history(*)
        `)
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({
            success: false,
            error: '申请不存在'
        });
    }

    if (data.applicant_id !== userId) {
        return res.status(403).json({
            success: false,
            error: '无权查看此申请'
        });
    }

    res.json({
        success: true,
        data: data
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const validatedData = adoptionApplicationSchema.parse(req.body);

    const { data: pet } = await supabase
        .from('pets')
        .select('id, name, breed, age, gender, image')
        .eq('id', validatedData.pet_id)
        .single();

    if (!pet) {
        return res.status(404).json({
            success: false,
            error: '宠物不存在'
        });
    }

    const { data: application, error: appError } = await supabase
        .from('adoption_applications')
        .insert({
            pet_id: validatedData.pet_id,
            applicant_id: userId,
            pet_name: pet.name,
            pet_breed: pet.breed,
            pet_age: pet.age,
            pet_gender: pet.gender,
            pet_image: pet.image,
            applicant_name: validatedData.applicant_name,
            phone: validatedData.phone,
            housing_type: validatedData.housing_type,
            has_window_protection: validatedData.has_window_protection,
            status: 'pending',
            current_step: 1,
            total_steps: 4,
            progress_label: '提交申请'
        })
        .select()
        .single();

    if (appError) throw appError;

    const { data: history, error: historyError } = await supabase
        .from('application_history')
        .insert([
            {
                application_id: application.id,
                title: '提交申请',
                time: new Date().toLocaleString('zh-CN'),
                description: '您已成功提交领养申请。',
                completed: true
            },
            {
                application_id: application.id,
                title: '资料审核',
                time: '进行中',
                description: '志愿者正在核实您的家庭环境与相关信息，请保持电话畅通。',
                completed: false,
                is_ongoing: true
            },
            {
                application_id: application.id,
                title: '线下家访',
                time: '未开始',
                description: '',
                completed: false
            },
            {
                application_id: application.id,
                title: '领养成功',
                time: '未开始',
                description: '',
                completed: false
            }
        ])
        .select();

    if (historyError) throw historyError;

    res.status(201).json({
        success: true,
        data: { ...application, history }
    });
}));

router.put('/:id/status', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status, current_step, progress_label } = req.body;

    const { data, error } = await supabase
        .from('adoption_applications')
        .update({
            status,
            current_step,
            progress_label
        })
        .eq('id', id)
        .select()
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

    const { data: application } = await supabase
        .from('adoption_applications')
        .select('applicant_id')
        .eq('id', id)
        .single();

    if (!application || application.applicant_id !== userId) {
        return res.status(403).json({
            success: false,
            error: '无权取消此申请'
        });
    }

    const { error } = await supabase
        .from('adoption_applications')
        .delete()
        .eq('id', id);

    if (error) throw error;

    res.json({
        success: true,
        message: '申请已取消'
    });
}));

export default router;
