import { Router } from "express";
const router = Router();
router.get("/", async (request, response) => {
    const message = {
        message: "Head over to the '/information/anime' page to show the details of your favorite anime.",
        code: response.statusCode,
        status: response.statusCode !== 200 ? "Bad Request" : "OK",
    };
    return response.status(200).send(message);
});
export default router;
