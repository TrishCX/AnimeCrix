import { Router } from "express";
import { getStatsOnly } from "../../functions/index.js";
const router = Router();
router.get("/information/stats", async (request, response) => {
    const baseName = request.query?.baseName;
    const animeResponse = await getStatsOnly(`${baseName}`);
    return response.status(200)?.send({
        ...animeResponse,
    });
});
export default router;
