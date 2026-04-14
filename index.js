const mongoose = require("mongoose");
const app = require("./app.js");
const config = require("./src/config/config.js");

// Connect to MongoDB
mongoose
  .connect(config.mongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// For local development
if (require.main === module) {
  const PORT = config.port || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
