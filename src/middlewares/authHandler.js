import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
    
    try {
      if (!req.headers.authorization) {
        throw { status: 401, message: 'No token provided' };
      }
      const token = req.headers.authorization.split(' ')[1];//[0] = "Bearer"
      const verified = jwt.verify(token, process.env.TOKEN_SECRET, { algorithms: ['HS256'] });
      req.user = verified;
      next();
    } catch (err) {
        console.log("err")
      next(err);
    }
  };
  