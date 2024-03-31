import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

function checkFileType(file, cb) {
  const filetypes = /jpg|png|jpeg|webp/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null , true)
  } else {
    cb('Images of type jpg, jpeg, png and webp only are currently supported')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, res, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${res.file.path}`)
})

export default router