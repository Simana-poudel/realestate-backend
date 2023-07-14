// const mongoose = require('mongoose');

// const ImageSchema = mongoose.Schema({
//     name: {
//         type: String,
//         require:true
//     },
//     image: {
//         data: Buffer,
//         contentType: String
//     }
// })

// const ImageModel = mongoose.model('Image', ImageSchema);


// module.exports = ImageModel;


// app.delete("/delete/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const filePath = `${__dirname}/uploads/${filename}`;

//   // Check if the file exists
//   fs.stat(filePath, (err, stats) => {
//     if (err || !stats.isFile()) {
//       return res.status(404).send("File not found");
//     }

//     // Delete the file
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error("Error deleting file:", err);
//         return res.status(500).send("Error deleting file");
//       }

//       res.send(`File ${filename} deleted successfully`);
//     });
//   });
// });

// app.get("/file/:filename", (req, res) => {
//   const filename = req.params.filename;
//   const filePath = `${__dirname}/uploads/${filename}`;

//   // Check if the file exists
//   fs.stat(filePath, (err, stats) => {
//     if (err || !stats.isFile()) {
//       return res.status(404).send("File not found");
//     }

//     // Send the file as a response
//     res.sendFile(filePath);
//   });
// });

