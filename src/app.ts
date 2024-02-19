import express, { Application, Request, Response, NextFunction } from "express";
import { router as userRoutes } from "./routes/user.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).send("Bad Request");
});

interface CustomError extends Error {
  code?: number;
}
app.use((err:CustomError,req: Request, res: Response, next: NextFunction) => {
  
  if (err.code===11000){
    res.status(400).send(err);
  }
  else{

    res.status(500).send("internal server error");
  }
});

export default app;
