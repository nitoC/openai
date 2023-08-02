import { Request, Response }from "express";
import { event } from "../index.js";
const Login =(req:Request, res:Response)=>{
event.emit('in login')
   res.render('login',{title:'AI login page',message:'', status:'', valid: false})
}

export default Login