const home = (req, res) => {
    const { valid } = req.body;
    if (valid === true || valid === "true") {
        return setTimeout(() => {
            res.render('index', { message: [], title: "AI-assistant", valid });
        }, 2000);
    }
    return res.json("an error occured");
};
export default home;
