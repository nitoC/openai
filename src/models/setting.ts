import {alterSettings } from "../index.js"

const settings = (temp: number, maxlength: number)=>{
   alterSettings(temp,maxlength);
   return {
    temperature:temp,
    length:maxlength
   }

}

export default settings
