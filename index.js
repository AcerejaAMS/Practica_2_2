import express from 'express';
import exphbs from 'express-handlebars';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",(req, res) => {
    res.render('inicio')
})

const fotos = {
    'imagen1':{img: "mono.png", url: "https://youtu.be/AHJEY6WCMmw"},
    'imagen2':{img: "pato.png", url: "https://youtu.be/vTsf0xj_sTM"},
    'imagen3':{img: "pelea.png", url: "https://youtu.be/ylV9VIeuZ64"},
    'imagen4':{img: "simi.jpg", url:"https://youtu.be/v6111W5BBWc"}
};

app.get("/ruta_1", (req, res) =>{
    const llaves = Object.keys(fotos);
    res.render('ruta1',{foto: fotos[llaves[llaves.length * Math.random() << 0]]})
});


app.get("/ruta_2", (req, res) =>{
    const data = req.body;
    res.render('ruta2',{a:data})
});

app.use((req, res) => {
    res.status(404);
    res.render('error/404');
});

app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500);
    res.render('error/500');
});

app.listen(PORT, () => {
    console.log(`Servidor Lanzado en ${PORT}`);
});