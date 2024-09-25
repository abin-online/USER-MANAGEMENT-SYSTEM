import multer from "multer";
import fs from "fs";
import path from "path";


const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true }); // Create the directory if it doesn't exist
}


const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, uploadsDir);  // Set upload destination
  },
  filename: function (req, file, callback) {
    // Generate unique filename using timestamp + original filename
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
