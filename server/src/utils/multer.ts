import multer from "multer";
import path from "path";

const multerUploads = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let extension = path.extname(file.originalname);
    if (
      extension !== ".jpg" &&
      extension !== ".jpeg" &&
      extension !== ".png" &&
      extension !== ".gif"
    ) {
      cb(
        new Error(
          "File extension not supported. Use jpg, jpeg, png or gif files only."
        ),
        false
      );
      return;
    }
    cb(null, true);
  },
});

export { multerUploads };
