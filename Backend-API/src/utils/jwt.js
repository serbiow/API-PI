import jwt from 'jsonwebtoken';

export async function encode(data) {
    try {
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (error) {
        throw new Error('Erro ao gerar token');
    }
}
