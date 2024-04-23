const express = require("express");
const app = express();

// Middleware to extract client information
app.use((req, res, next) => {
  req.clientInfo = {
    ip:
      req.headers["x-real-ip"] ||
      req.headers["x-forwarded-for"] ||
      req.headers["cf-connecting-ip"] ||
      req.socket.remoteAddress,
    userAgent: req.headers["user-agent"],
    language: req.headers["accept-language"],
    referer: req.headers.referer || "No referer header",
  };
  next();
});

// Route to handle incoming requests
app.get("/", (req, res) => {
  console.log("INFORMATION", {
    ip: req.clientInfo.ip,
    userAgent: req.clientInfo.userAgent,
    language: req.clientInfo.language,
    referer: req.clientInfo.referer,
  });
  res.json({
    ip: req.clientInfo.ip,
    userAgent: req.clientInfo.userAgent,
    language: req.clientInfo.language,
    referer: req.clientInfo.referer,
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
