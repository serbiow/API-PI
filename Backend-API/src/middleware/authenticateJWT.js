import jwt from 'jsonwebtoken'

const JWT_SECRET = "C3swDTsQgTUnlRTM/J66J6OvNBj08iMIKPY6Egaih/r1k97TMhpdI29fRWFJLpZEHP2oGUyLLqA7gY8d";

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export default authenticateJWT;