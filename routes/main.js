
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const getHash = require('hash-stream');
const multer = require('multer');
//const uploads = multer({ dest: 'uploads/' });

router.get('/', (req, res) => {
    res.render('main');
});

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    // filename: (req, file, cb) => {
    //     cb(null, Date.now() + path.extname(file.originalname));
    //     //cb(null, file.originalname + '-' + Date.now());
    // }
});

router.use(express.static(__dirname));

router.use(multer({storage:storageConfig}).single('photo'));

hash = '';
newName = '';

//загрузка одного изображения
router.post('/uploads', function(req, res, next){
    const filedata = req.file;
    // console.log ('Тип файла:', filedata.mimetype);
    // console.log ('Имя файла', filedata.originalname);
    // console.log ('Размер файла:', filedata.size);
    // console.log ('Путь для сохранения:', filedata.path);
    console.log(filedata);
    if(!filedata)
        res.send("Ошибка при загрузке файла");
    else {
        //res.send("Файл загружен");    

    getHash(filedata.path, 'sha256', function (err, hash) {
        hash = hash.toString('hex');
        
        newName = './uploads/' + hash + path.extname(filedata.originalname); 
        console.log(newName);
        fs.rename(filedata.path, newName, (err) => {
            if (err) throw err;
            console.log('file renamed');
        });
        })
        console.log('отдача', newName);
        res.render('uploads', newName);
    
    }
 });


// router.use((req, res, next) => {
//     console.log('URL:', req.url);
//     //res.send('моя прелесть!'); 
//     next();  
// });

module.exports = router;