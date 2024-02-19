import express, { Application, Request, Response, NextFunction } from "express";
import { connectDatabase, client } from "./dbConnection";
import { router as userRoutes } from "./routes/user.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", userRoutes);

app.all("/*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).send("Bad Request");
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("internal server error");
});

export default app;
