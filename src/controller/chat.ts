import { Request, Response } from "express";
import message from "../utils/openai.js";
import { temperature, maxlength, startText, historyArr, event } from "../index.js";


const chat = async (req: Request, res: Response) => {
  const { inputData } = req.body;

  //  logs out user
  if(inputData === ''){
    console.log('logout success')
    event.emit('in login')
    res.json({message:"logout successful"})
    return;
  }
  //logs out user
  
  historyArr.push({ role: "user", content: inputData });
  try {
    const msgs: any[] = (await message(
      historyArr,
      temperature,
      maxlength
    )) as any[];// sends request to openai

    console.log(msgs);
    if (msgs[0].message) {
      historyArr.push({ role: "assistant", content: startText +" "+ msgs[0].message.content });
      res.status(200).json({ message: historyArr });
    } else {
      res.status(500);
    }
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

export default chat;
