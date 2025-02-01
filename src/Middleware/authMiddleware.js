import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const token = req.cookies?.token || req.header("Authorizaton")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ error: 'Unauthorized Request.' ,status:false});
  
    try {
      const decoded = jwt.verify(token,process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(400).json({ error: 'Invalid token.' });
    }
  };
  