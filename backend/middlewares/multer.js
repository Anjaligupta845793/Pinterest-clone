import multer from "multer";
const upload = multer({ dest: "./uploads" });

const FileUploads = () => {
  console.log("multer is running ");
  upload.single("file");
};

export default FileUploads;
