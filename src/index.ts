import  Express  from "express"; 
import routes from './routes/index.js'
import dotenv from "dotenv"
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import EventEmitter from "events";
import settings from "./models/setting.js";

dotenv.config();

const event = new EventEmitter()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = Express();
const port = process.env.PORT
let temperature: number;
let maxlength: number;
let startText:string;
let historyArr:any[] = [];
let alterSettings = (temp:number, len:number)=>{
   temperature=temp,
   maxlength=len
}
let handleStartText = (val:string)=>{
  startText = val
}

event.on('in login', ()=>{
  console.log("in event")
  historyArr = []
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(routes)
app.use(Express.static('public'))

app.set("views", path.join(__dirname, "/views/layouts"));
app.set('view engine', 'pug')

app.listen(port||3000, ()=>{
    const result = settings(1, 256)
    temperature = result.temperature;
    maxlength = result.length;
    console.log('listening to a port')
})

export {
    temperature,
    maxlength,
    startText,
    alterSettings,
    handleStartText,
    event,
    historyArr
}