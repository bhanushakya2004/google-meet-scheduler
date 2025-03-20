const axios = require("axios");

const authMiddleware = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
      console.log("🔹 Token from Authorization header:", token);
    }

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // Verify Google OAuth Access Token
    const googleResponse = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);

    if (!googleResponse.data || !googleResponse.data.email) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    console.log("✅ Google OAuth Token Verified:", googleResponse.data);

    req.user = {
      email: googleResponse.data.email,
      access_token: token, // ✅ Make sure the token is saved here
    };

    next();
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.response?.data || error.message);
    return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
