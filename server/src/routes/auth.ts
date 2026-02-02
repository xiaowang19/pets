import { Router } from 'express';
import { supabase } from '../config/supabase.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { userSchema } from '../validators/index.js';

const router = Router();

router.post('/register', asyncHandler(async (req, res) => {
    const validatedData = userSchema.parse(req.body);

    const { data, error } = await supabase.auth.signUp({
        email: validatedData.email,
        password: validatedData.password
    });

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    const { data: user, error: userError } = await supabase
        .from('users')
        .insert({
            id: data.user.id,
            email: validatedData.email,
            password_hash: validatedData.password,
            name: validatedData.name,
            avatar: validatedData.avatar,
            location: validatedData.location
        })
        .select()
        .single();

    if (userError) throw userError;

    res.status(201).json({
        success: true,
        data: {
            user: data.user,
            profile: user
        }
    });
}));

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        return res.status(401).json({
            success: false,
            error: '邮箱或密码错误'
        });
    }

    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

    res.json({
        success: true,
        data: {
            user: data.user,
            profile
        }
    });
}));

router.get('/profile', asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        return res.status(404).json({
            success: false,
            error: '用户不存在'
        });
    }

    res.json({
        success: true,
        data: data
    });
}));

router.put('/profile', asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { name, avatar, location } = req.body;

    const { data, error } = await supabase
        .from('users')
        .update({
            name,
            avatar,
            location,
            updated_at: new Date()
        })
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;

    res.json({
        success: true,
        data: data
    });
}));

router.post('/logout', asyncHandler(async (req, res) => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    res.json({
        success: true,
        message: '登出成功'
    });
}));

export default router;
