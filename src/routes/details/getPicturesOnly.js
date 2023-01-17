import { Router } from "express";
import getPictures from "../../functions/helpers/getPictures.js";
import { getInformation } from "../../functions/index.js";
const router = Router();
router.get("/information/pictures", async (request, response) => {
    const baseName = request.query?.baseName;
    const uriToFetch = await getInformation(baseName || `${baseName}`);
    const pictures = await getPictures(uriToFetch || `${uriToFetch}`);
    console.log(pictures);
    return response.status(200)?.send({
        images: pictures,
    });
});
export default router;
