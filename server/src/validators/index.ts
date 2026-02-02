import { z } from 'zod';

export const petSchema = z.object({
    name: z.string().min(1, '宠物名称不能为空'),
    breed: z.string().min(1, '品种不能为空'),
    age: z.string().min(1, '年龄不能为空'),
    gender: z.enum(['公', '母']),
    distance: z.string().optional(),
    time_label: z.string().optional(),
    image: z.string().url('图片URL格式不正确'),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    health_status: z.array(z.string()).optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    friendliness: z.string().optional(),
    shedding: z.string().optional(),
    category: z.string().default('狗狗'),
    status: z.enum(['available', 'adopted', 'pending']).default('available')
});

export const adoptionApplicationSchema = z.object({
    pet_id: z.string().uuid('宠物ID格式不正确'),
    applicant_name: z.string().min(1, '申请人姓名不能为空'),
    phone: z.string().regex(/^1[3-9]\d{9}$/, '手机号格式不正确'),
    housing_type: z.enum(['自有住房', '整租', '合租', '宿舍']),
    has_window_protection: z.boolean().default(false)
});

export const messageSchema = z.object({
    receiver_id: z.string().uuid('接收者ID格式不正确'),
    content: z.string().min(1, '消息内容不能为空')
});

export const postSchema = z.object({
    title: z.string().min(1, '标题不能为空'),
    content: z.string().optional(),
    image: z.string().url('图片URL格式不正确'),
    category: z.enum(['领养故事', '养宠经验', '寻宠启事', '宠物美照']).default('领养故事')
});

export const userSchema = z.object({
    email: z.string().email('邮箱格式不正确'),
    password: z.string().min(6, '密码至少6位'),
    name: z.string().min(1, '姓名不能为空'),
    avatar: z.string().url().optional(),
    location: z.string().optional()
});

export type PetInput = z.infer<typeof petSchema>;
export type AdoptionApplicationInput = z.infer<typeof adoptionApplicationSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type PostInput = z.infer<typeof postSchema>;
export type UserInput = z.infer<typeof userSchema>;
