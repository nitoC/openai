import { Request, Response, NextFunction } from "express";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const { valid } = req.body;
  let auth = valid;
  if (auth === "true") {
    next();
  } else {
    res.render("login", {
      title: "AI login page",
      message: "",
      status: "",
      valid: false,
    });
  }
};
export default validate;
