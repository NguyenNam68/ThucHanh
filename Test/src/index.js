const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ extname : '.hbs' });
const route = require('./routes/');
const bodyparser = require('body-parser');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require("cors");

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources' ,'views'));

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'vietnam',
    password: 'namnguyen2411',
    database: 'mydb',
});
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
 
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'src/public/image/')     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.filename + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});
 
app.get('/upload', (req, res) => {
    res.render('upload');
})
//@type   POST
//route for post data
app.post("/upload", upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log("No file upload");
    } else {
        console.log(req.file.filename)
        var imgsrc = req.file.filename;
        var insertData = "INSERT INTO images (id, image) VALUES(NULL,?)"
        db.query(insertData, [imgsrc], (err, result) => {
            if (err) throw err
            console.log("file uploaded")
        })
    }
});

route(app);

app.listen(port, () => console.log(`
    App listening at http://localhost:${port}
`));