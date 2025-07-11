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
const allowed = [
  'http://localhost:5173',                 // local dev
  'https://hotel-booking-react-7dbd.vercel.app/' // production
];
const vercelPreview = /^https:\/\/hotel-booking-react-[\w-]+\.vercel\.app$/;
 // any preview

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);               
      if (allowed.includes(origin) || vercelPreview.test(origin))
        return cb(null, true);
      cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
app.use('/api/v1/rooms', roomRoutes); // Changed from adminRoutes to roomRoutes


// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: 'Your server is up and running....'
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Internal Server Error'
  });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});