import multer from "multer";
import path from "path";

const multerUploads = multer({
  storage: multer.diskStorage({}),
});
