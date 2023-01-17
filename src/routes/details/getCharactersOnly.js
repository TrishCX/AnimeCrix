import { Router } from "express";
import { getInformation } from "../../functions/index.js";
import getCharacters from "../../functions/helpers/getCharacters.js";
const router = Router();
router.get("/information/characters", async (request, response) => {
    const baseName = request.query.baseName;
    const uriToFetch = await getInformation(baseName);
    const result = await getCharacters(`${uriToFetch}`);
    const cleanResults = [...result];
    return response.status(200).send({
        characters: cleanResults,
    });
});
export default router;
