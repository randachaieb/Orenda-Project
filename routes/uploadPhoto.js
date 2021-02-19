/*const router = require('express').Router();
const fileUpload = require('express-fileupload')


// Upload Photo
router.post('/upload',fileUpload(), async (req, res) => {
    if (req.files === null) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
  
    const file = req.files.file;
    console.log(file)


    file.mv(`../Orenda Project/client/public/uploads/${file.name}`, err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
  });

module.exports = router*/