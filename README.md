# PetLove 宠物领养平台

一个完整的前后端分离的宠物领养平台，使用 React + TypeScript + Vite 作为前端，Node.js + Express + TypeScript + Supabase 作为后端。

## 项目结构

```
petlove---pet-adoption-platform/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── api/           # API 客户端
│   │   ├── components/     # React 组件
│   │   ├── pages/         # 页面组件
│   │   └── ...
│   └── ...
└── server/                # 后端项目
    ├── src/
    │   ├── config/        # 配置文件
    │   ├── middleware/    # 中间件
    │   ├── routes/        # 路由
    │   ├── validators/    # 数据验证
    │   └── index.ts      # 入口文件
    ├── supabase/          # Supabase 数据库文件
    └── ...
```

## 功能特性

### 前端功能
- 🏠 首页：浏览宠物列表，按类别筛选
- 🐾 宠物详情：查看宠物详细信息
- 📝 领养申请：提交领养申请表单
- 📊 进度跟踪：查看领养申请进度
- 💬 消息中心：查看和发送消息
- 👥 社区：浏览和发布社区帖子
- 👤 个人中心：管理个人信息

### 后端功能
- 用户认证（注册、登录、登出）
- 宠物管理（增删改查）
- 领养申请管理（提交、更新、取消）
- 消息系统（发送、接收、标记已读）
- 社区帖子（发布、点赞、删除）
- 数据验证和错误处理

## 技术栈

### 前端
- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS

### 后端
- Node.js
- Express.js
- TypeScript
- Supabase (PostgreSQL)
- Zod (数据验证)
- CORS
- Helmet (安全)

## 快速开始

### 前端设置

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量：
在项目根目录创建 `.env.local` 文件：
```env
VITE_API_BASE_URL=http://localhost:3001/api
```

3. 启动开发服务器：
```bash
npm run dev
```

前端将在 `http://localhost:5173` 运行

### 后端设置

1. 进入后端目录：
```bash
cd server
```

2. 安装依赖：
```bash
npm install
```

3. 配置 Supabase：
- 在 [Supabase](https://supabase.com/) 创建一个新项目
- 复制 `.env.example` 为 `.env`
- 填入你的 Supabase 凭证：
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
PORT=3001
NODE_ENV=development
```

4. 设置数据库：
在 Supabase 的 SQL Editor 中执行以下文件：
- `server/supabase/schema.sql` - 创建表结构和安全策略
- `server/supabase/functions.sql` - 创建存储函数

5. 启动后端服务器：
```bash
npm run dev
```

后端 API 将在 `http://localhost:3001` 运行

## API 文档

详细的 API 文档请查看 [server/README.md](server/README.md)

### 主要端点

#### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/profile` - 获取用户信息
- `PUT /api/auth/profile` - 更新用户信息
- `POST /api/auth/logout` - 用户登出

#### 宠物
- `GET /api/pets` - 获取宠物列表
- `GET /api/pets/:id` - 获取宠物详情
- `POST /api/pets` - 发布宠物
- `PUT /api/pets/:id` - 更新宠物信息
- `DELETE /api/pets/:id` - 删除宠物

#### 领养申请
- `GET /api/applications` - 获取申请列表
- `GET /api/applications/:id` - 获取申请详情
- `POST /api/applications` - 提交领养申请
- `PUT /api/applications/:id/status` - 更新申请状态
- `DELETE /api/applications/:id` - 取消申请

#### 消息
- `GET /api/messages/conversations` - 获取会话列表
- `GET /api/messages/:userId` - 获取消息
- `POST /api/messages` - 发送消息
- `POST /api/messages/mark-read/:userId` - 标记消息已读

#### 社区
- `GET /api/posts` - 获取帖子列表
- `GET /api/posts/:id` - 获取帖子详情
- `POST /api/posts` - 发布帖子
- `POST /api/posts/:id/like` - 点赞/取消点赞
- `DELETE /api/posts/:id` - 删除帖子

## 数据库表结构

### users
用户表，存储用户基本信息

### pets
宠物表，存储宠物信息

### adoption_applications
领养申请表，存储领养申请信息

### application_history
申请历史记录表，存储申请进度历史

### messages
消息表，存储用户间消息

### conversations
会话表，存储用户会话信息

### posts
社区帖子表，存储社区帖子

### likes
点赞表，存储帖子点赞记录

## 安全特性

- JWT 认证
- CORS 配置
- Helmet 安全头
- 请求速率限制
- SQL 注入防护（Supabase 自动处理）
- 行级安全策略（RLS）

## 开发说明

### 前端开发
- 组件位于 `src/components/`
- 页面位于 `src/pages/`
- API 调用位于 `src/api/`
- 类型定义位于 `src/types.ts`

### 后端开发
- 路由位于 `src/routes/`
- 中间件位于 `src/middleware/`
- 验证器位于 `src/validators/`
- 配置位于 `src/config/`

## 部署

### 前端部署
```bash
npm run build
```
将 `dist` 目录部署到静态托管服务（如 Vercel、Netlify）

### 后端部署
```bash
npm run build
npm start
```
部署到 Node.js 托管服务（如 Railway、Render、Heroku）

## 许可证

MIT
