const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const Profile = require("./routes/Profile");
const roomRoutes = require("./routes/adminRoutes");

dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const allowedOrigins = [
  "http://localhost:5173",
  "https://hotel-booking-react-7dbd.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🚫 CORS blocked:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);



app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Cloudinary connection
cloudinaryConnect();

// Route imports with error handling
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/profile", Profile);
app.use('/api/v1/rooms', roomRoutes);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS Error: Origin not allowed",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});


const _server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log('✅ Allowed CORS origins:', allowedOrigins);
});