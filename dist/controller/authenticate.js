const validate = (req, res, next) => {
    const { valid } = req.body;
    let auth = valid;
    if (auth === "true") {
        next();
    }
    else {
        res.render("login", {
            title: "AI login page",
            message: "",
            status: "",
            valid: false,
        });
    }
};
export default validate;
