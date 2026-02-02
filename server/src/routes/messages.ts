import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { messageSchema } from '../validators/index.js';

const router = Router();

router.get('/conversations', asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const { data, error } = await supabase
        .from('conversations')
        .select(`
            *,
            other_user:other_user_id(id, name, avatar)
        `)
        .eq('user_id', userId)
        .order('last_message_time', { ascending: false });

    if (error) throw error;

    res.json({
        success: true,
        data: data
    });
}));

router.get('/:userId', asyncHandler(async (req, res) => {
    const { userId: otherUserId } = req.params;
    const userId = req.user.id;
    const { limit = 50, offset = 0 } = req.query;

    const { data, error } = await supabase
        .from('messages')
        .select(`
            *,
            sender:sender_id(id, name, avatar),
            receiver:receiver_id(id, name, avatar)
        `)
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order('created_at', { ascending: false })
        .range(Number(offset), Number(offset) + Number(limit) - 1);

    if (error) throw error;

    await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('receiver_id', userId)
        .eq('sender_id', otherUserId);

    res.json({
        success: true,
        data: data.reverse()
    });
}));

router.post('/', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const validatedData = messageSchema.parse(req.body);

    const { data: message, error: msgError } = await supabase
        .from('messages')
        .insert({
            sender_id: userId,
            receiver_id: validatedData.receiver_id,
            content: validatedData.content
        })
        .select(`
            *,
            sender:sender_id(id, name, avatar),
            receiver:receiver_id(id, name, avatar)
        `)
        .single();

    if (msgError) throw msgError;

    await supabase.rpc('upsert_conversation', {
        p_user_id: userId,
        p_other_user_id: validatedData.receiver_id,
        p_last_message: validatedData.content
    });

    await supabase.rpc('upsert_conversation', {
        p_user_id: validatedData.receiver_id,
        p_other_user_id: userId,
        p_last_message: validatedData.content
    });

    res.status(201).json({
        success: true,
        data: message
    });
}));

router.post('/mark-read/:userId', asyncHandler(async (req, res) => {
    const { userId: otherUserId } = req.params;
    const userId = req.user.id;

    const { error } = await supabase
        .from('messages')
        .update({ is_read: true })
        .eq('receiver_id', userId)
        .eq('sender_id', otherUserId);

    if (error) throw error;

    res.json({
        success: true,
        message: '已标记为已读'
    });
}));

export default router;
