import {Router}from "express";
import Express from "express";
import Chats from '../controller/chat.js'
import home from '../controller/home.js'
import login from '../controller/login.js'
import loginUser from '../controller/loginUser.js'
import authenticate from '../controller/authenticate.js'
import settings from "../controller/settings.js";

const router:Router = Express.Router()

router.post('/message', authenticate, home)
router.get('/', login)
router.post('/chat', Chats)
router.post('/config', settings)
router.post('/login', loginUser)


export default router;
