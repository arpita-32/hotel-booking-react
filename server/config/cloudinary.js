const cloudinary = require("cloudinary").v2

exports.cloudinaryConnect = () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
      secure: true,
      timeout: 60000,
    })

    console.log("🌤️  Cloudinary Configuration:")
    console.log("Cloud Name:", process.env.CLOUD_NAME ? "✅ Set" : "❌ Not set")
    console.log("API Key:", process.env.API_KEY ? "✅ Set" : "❌ Not set")
    console.log("API Secret:", process.env.API_SECRET ? "✅ Set" : "❌ Not set")

    // Test the connection
    cloudinary.api
      .ping()
      .then((result) => {
        console.log("✅ Cloudinary connection test successful:", result.status)
      })
      .catch((error) => {
        console.error("❌ Cloudinary connection test failed:", error.message)
      })
  } catch (error) {
    console.error("❌ Cloudinary connection error:", error.message)
  }
}
