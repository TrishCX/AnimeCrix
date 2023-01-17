import { Router } from "express";
import { getCompleteInformation } from "../../functions/index.js";
const router = Router();
router.get("/information/anime", async (request, response) => {
    const animeName = request.query?.name;
    const info = await getCompleteInformation(animeName);
    return response.send({
        ...info,
    });
});
export default router;
