import bcrypt from 'bcrypt';

export async function encrypt(value){
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    return await bcrypt.hash(value, salt);
};

export async function verify(ref, value, callback){
    bcrypt.compare(ref, value, (err, result) => callback(err, result));
}