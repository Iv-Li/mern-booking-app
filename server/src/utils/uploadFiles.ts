import multer from 'multer';
import cloudinary from 'cloudinary'

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  }
})

const uploadFilesMiddleware = () => upload.array('imageUrls', 6)
const uploadImagesToCloud = async (images: Express.Multer.File[]): Promise<string[]> => {
  const uploadPromises = images.map(async img => {

    const b64 = img.buffer.toString('base64')
    let dataURI = "data:" + img.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url
  })

  const imgUrls = await Promise.all(uploadPromises)
  return imgUrls
}

export {
  uploadFilesMiddleware,
  uploadImagesToCloud
}