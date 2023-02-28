import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret: any = process.env.JWT_SECRET;
// Middleware para verificar o token de autenticação
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    // Verificar se o token de autenticação está presente no header da requisição
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido' });
    }

    // Extrair o token de autenticação da string 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }

    // Verificar se o token é válido e decodificar os dados do usuário
    try {
        const decoded = jwt.verify(token, secret);
        res.locals.user = decoded;
        res.locals.
            next();
    } catch (err) {
        return res.status(401).json({ error: 'Token de autenticação inválido' });
    }
};
