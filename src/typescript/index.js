import { getInformationAboutAnime } from "./routes/index.js";
import express from "express";
import cors from "cors";
import { PORT as Port } from "./configurations/config.js";
const app = express();
app.use(cors({
    origin: "*",
}));
express.urlencoded({ extended: true });
app.use("/v1", getInformationAboutAnime);
app.listen(Port, () => console.log("The server is now live."));
