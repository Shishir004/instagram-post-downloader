require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { instagramGetUrl } = require("instagram-url-direct");

const app = express();
app.use(cors({
  origin: ["https://your-frontend-domain.com"], // Update this with the frontend URL
  methods: ["POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post("/api/download", async (req, res) => {
  const { url } = req.body;

  try {
    const result = await instagramGetUrl(url);

    if (result && result.url_list && result.url_list.length > 0) {
      res.json({ success: true, urls: result.url_list });
    } else {
      res.status(400).json({ success: false, message: "No media found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Invalid or unsupported Instagram URL" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
