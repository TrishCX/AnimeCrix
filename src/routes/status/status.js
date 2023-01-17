import { Router } from "express";
const router = Router();
router.get("/status", async (request, response) => {
    return response.sendStatus(response.statusCode);
});
export default router;
