// Middleware to verify token in session
export const verifyToken = (req, res, next) => {
    // const token = sessionStorage.getItem(token);
    const token=req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token,"12345432gfdsdfge34r12#@@#$##fgrbvfetgdg");
        console.log(decoded);
        // Attach user information to request object
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token", success: false });
    }
};

// Protected route
// app.get('/protected', verifyToken, (req, res) => {
//     // Only authenticated users can access this route
//     res.json({ message: "Protected route accessed", user: req.user });
// });
