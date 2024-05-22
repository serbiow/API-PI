import jwt from 'jsonwebtoken';

export async function encode(data){
   return jwt.sign({...data}, process.env.JWT_SECRET, { expiresIn: '1h' })
}
