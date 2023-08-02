const LoginUser = (req, res) => {
    const { email, password } = req.body;
    const guestEmail = 'guest@gmail.com';
    const guestPassword = 'guest001';
    if (email === guestEmail && password === guestPassword) {
        res.status(200).render('login', { title: 'AI login page', message: "login Successfull ", status: "successfull", valid: true });
    }
    else {
        res.status(401).render('login', { title: 'AI login page', message: "Invalid login credentials ", status: "unsuccessfull", valid: false });
    }
};
export default LoginUser;
