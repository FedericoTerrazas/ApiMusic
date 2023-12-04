import  express  from "express";
import { connection } from "./db_config.js";
import {router as musicRT } from "./src/music/musicRt.js"
import cors from "cors";

const PORT = process.env.PORT ?? 3000; // puerto por en variable de entorno o en el 3000
const app = express ();

app.use (cors("*"))       // npm i cors
app.disable("x-powered-by")  // seguridad
app.use(express.json());         // uso de modulos

app.listen (PORT ,err =>{
    console.log(
      err ? `Hay un error ${err}`:
      `El servidor corre en  http://localhost:${PORT}`
    );
})

app.use("/music",musicRT);


