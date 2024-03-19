import { Router, Request, Response } from "express";
import { startLoadingWebPages } from "../controllers/start";


export default (app: any) => {

  const router = Router();

  router.get("/start", (req: Request, res: Response) => {
    try {
      startLoadingWebPages()
      res.sendStatus(200)
    } catch (error) {
      res.send(error)
    }
  });


  app.use("/engin", router);
};
