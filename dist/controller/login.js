import { event } from "../index.js";
const Login = (req, res) => {
    event.emit('in login');
    res.render('login', { title: 'AI login page', message: '', status: '', valid: false });
};
export default Login;
