import app from "./app";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file


const PORT: any = process.env.PORT;

app.listen(PORT, (): void => console.log(`running on port ${PORT}`));
