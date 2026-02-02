import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { postSchema } from '../validators/index.js';

const router = Router();

router.get('/', asyncHandler(async (req, res) => {
    const { category, limit = 20, offset = 0 } = req.query;

    let query = supabase
        .from('posts')
        .select(`
            *,
            author:author_id(id, name, avatar),
            likes_count:likes(count)
        `)
        .order('created_at', { ascending: false });

    if (category) {
        query = query.eq('category', category);
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
    const userId = req.user?.id;

    const { data, error } = await supabase
        .from('posts')
        .select(`
            *,
            author:author_id(id, name, avatar),
            likes:likes(user_id),
            likes_count:likes(count)
        `)
        .eq('id', id)
        .single();

    if (error) {
        return res.status(404).json({
            success: false,
            error: '帖子不存在'
        });
    }

    const isLiked = userId ? data.likes.some((like: any) => like.user_id === userId) : false;

    res.json({
        success: true,
        data: { ...data, isLiked }
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const validatedData = postSchema.parse(req.body);

    const { data, error } = await supabase
        .from('posts')
        .insert({
            ...validatedData,
            author_id: userId
        })
        .select(`
            *,
            author:author_id(id, name, avatar)
        `)
        .single();

    if (error) throw error;

    res.status(201).json({
        success: true,
        data: data
    });
}));

router.post('/:id/like', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: existingLike } = await supabase
        .from('likes')
        .select()
        .eq('post_id', id)
        .eq('user_id', userId)
        .single();

    if (existingLike) {
        const { error } = await supabase
            .from('likes')
            .delete()
            .eq('post_id', id)
            .eq('user_id', userId);

        if (error) throw error;

        await supabase.rpc('decrement_likes_count', { p_post_id: id });

        res.json({
            success: true,
            liked: false
        });
    } else {
        const { error } = await supabase
            .from('likes')
            .insert({
                post_id: id,
                user_id: userId
            });

        if (error) throw error;

        await supabase.rpc('increment_likes_count', { p_post_id: id });

        res.json({
            success: true,
            liked: true
        });
    }
}));

router.delete('/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const { data: post } = await supabase
        .from('posts')
        .select('author_id')
        .eq('id', id)
        .single();

    if (!post || post.author_id !== userId) {
        return res.status(403).json({
            success: false,
            error: '无权删除此帖子'
        });
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

    if (error) throw error;

    res.json({
        success: true,
        message: '删除成功'
    });
}));

export default router;
