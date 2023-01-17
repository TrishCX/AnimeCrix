import { Router } from "express";
const router = Router();
router.get("/test", async (request, response) => {
    setTimeout(() => {
        return response.send({
            content: "Yikes",
        });
    }, 2000);
    return response.status(408).send({
        content: "Wait",
    });
});
export default router;
