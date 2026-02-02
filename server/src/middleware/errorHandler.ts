import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error('Error:', err);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            error: err.errors || err.message
        });
    }

    if (err.code === '23505') {
        return res.status(409).json({
            success: false,
            error: '数据已存在'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        error: err.message || '服务器内部错误'
    });
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
