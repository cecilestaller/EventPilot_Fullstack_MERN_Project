import jwt from "jsonwebtoken";

export async function doJwtAuth(req, res, next) {
    const _invalidAuthResponse = (message) =>
        res.status(401).json({
            success: false,
            message: message || "Invalid authentication",
        });
    try {
        const tokenString = extractTokenFromRequest();
        const tokenPayload = jwt.verify(tokenString, process.env.JWT_SECRET);
        req.verifiedUserClaims = tokenPayload;
        next();
    } catch (error) {
        console.log(error);
        return _invalidAuthResponse("Invalid token");
    }
    function extractTokenFromRequest() {
        const authorization = req.headers.authorization;
        if (authorization) {
            const [authType, tokenString] = authorization.split(" ");
            if (authType !== "Bearer" || !tokenString) return null;
            else return tokenString;
        } else {
            return req.session.refreshToken;
        }
    }
}
