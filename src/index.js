import { getInformationAboutAnime, getStatsOnly, getPicturesOnly, getCharactersOnly, statusPage, startPage, } from "./routes/index.js";
import express from "express";
import cors from "cors";
import { PORT as Port } from "./configurations/config.js";
const app = express();
app.use(cors({
    origin: "*",
}));
express.urlencoded({ extended: true });
app.use("/v1", startPage);
app.use("/v1", getInformationAboutAnime);
app.use("/v1", getStatsOnly);
app.use("/v1", getPicturesOnly);
app.use("/v1", getCharactersOnly);
app.use("/v1", statusPage);
app.get("*", async (req, res) => res.send({
    message: "Not a valid page.",
}));
app.listen(Port, () => console.log("The server is now live."));
