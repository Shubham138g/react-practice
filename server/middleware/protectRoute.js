// Middleware to verify token in session
export const verifyToken = (req, res, next) => {
    
    const token = req.headers['authorization'];
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token,"12345432gfdsdfge34r12#@@#$##fgrbvfetgdg", { algorithms: ['HS256'] });
        console.log(decoded);
        // Attach user information to request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", success: false });
    }
};

