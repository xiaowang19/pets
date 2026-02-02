# PetLove 后端 API 文档

## 概述

PetLove 后端使用 Node.js + Express + TypeScript + Supabase 构建，提供宠物领养平台的完整后端服务。

## 技术栈

- Node.js
- Express.js
- TypeScript
- Supabase (PostgreSQL 数据库)
- Zod (数据验证)

## 安装

```bash
cd server
npm install
```

## 环境变量

复制 `.env.example` 为 `.env` 并配置：

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=development
```

## 数据库设置

1. 在 Supabase 创建项目
2. 在 SQL Editor 中执行 `supabase/schema.sql` 创建表结构
3. 执行 `supabase/functions.sql` 创建存储函数

## 运行

```bash
npm run dev
```

## API 端点

### 认证 API

#### POST /api/auth/register
注册新用户

**请求体:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名",
  "avatar": "https://example.com/avatar.jpg",
  "location": "北京市朝阳区"
}
```

#### POST /api/auth/login
用户登录

**请求体:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/profile
获取用户信息 (需要认证)

**请求头:**
```
Authorization: Bearer {token}
```

#### PUT /api/auth/profile
更新用户信息 (需要认证)

#### POST /api/auth/logout
用户登出 (需要认证)

### 宠物 API

#### GET /api/pets
获取宠物列表

**查询参数:**
- `category`: 宠物类别 (狗狗/猫咪/兔子/鸟类)
- `status`: 状态 (available/adopted/pending)
- `limit`: 每页数量 (默认 20)
- `offset`: 偏移量

#### GET /api/pets/:id
获取宠物详情

#### POST /api/pets
发布宠物 (需要认证)

**请求体:**
```json
{
  "name": "旺财",
  "breed": "金毛寻回犬",
  "age": "2岁",
  "gender": "公",
  "distance": "1.2km",
  "time_label": "刚刚",
  "image": "https://example.com/dog.jpg",
  "description": "宠物描述",
  "tags": ["标签1", "标签2"],
  "health_status": ["已疫苗", "已驱虫"],
  "size": "中型犬",
  "energy": "活力充沛",
  "friendliness": "极度粘人",
  "shedding": "适中",
  "category": "狗狗",
  "status": "available"
}
```

#### PUT /api/pets/:id
更新宠物信息 (需要认证，仅宠物主人)

#### DELETE /api/pets/:id
删除宠物 (需要认证，仅宠物主人)

### 领养申请 API

#### GET /api/applications
获取申请列表 (需要认证)

**查询参数:**
- `status`: 状态 (pending/approved/rejected/completed)
- `limit`: 每页数量
- `offset`: 偏移量

#### GET /api/applications/:id
获取申请详情 (需要认证)

#### POST /api/applications
提交领养申请 (需要认证)

**请求体:**
```json
{
  "pet_id": "uuid",
  "applicant_name": "申请人姓名",
  "phone": "13800138000",
  "housing_type": "自有住房",
  "has_window_protection": true
}
```

#### PUT /api/applications/:id/status
更新申请状态 (需要认证，仅宠物主人)

#### DELETE /api/applications/:id
取消申请 (需要认证，仅申请人)

### 消息 API

#### GET /api/messages/conversations
获取会话列表 (需要认证)

#### GET /api/messages/:userId
获取与指定用户的消息 (需要认证)

#### POST /api/messages
发送消息 (需要认证)

**请求体:**
```json
{
  "receiver_id": "uuid",
  "content": "消息内容"
}
```

#### POST /api/messages/mark-read/:userId
标记消息为已读 (需要认证)

### 社区帖子 API

#### GET /api/posts
获取帖子列表

**查询参数:**
- `category`: 类别 (领养故事/养宠经验/寻宠启事/宠物美照)
- `limit`: 每页数量
- `offset`: 偏移量

#### GET /api/posts/:id
获取帖子详情

#### POST /api/posts
发布帖子 (需要认证)

**请求体:**
```json
{
  "title": "帖子标题",
  "content": "帖子内容",
  "image": "https://example.com/image.jpg",
  "category": "领养故事"
}
```

#### POST /api/posts/:id/like
点赞/取消点赞帖子 (需要认证)

#### DELETE /api/posts/:id
删除帖子 (需要认证，仅作者)

## 数据库表结构

### users
用户表

### pets
宠物表

### adoption_applications
领养申请表

### application_history
申请历史记录表

### messages
消息表

### conversations
会话表

### posts
社区帖子表

### likes
点赞表
