import { Router } from "https://deno.land/x/oak/mod.ts";
import controllers from "../controllers/index.ts";

const router = new Router();
router.get("/address/balance/:address", getShape)
  .post("/shapes", addShape)
  .put("/shapes/:id", updateShape)
  .delete("/shapes/:id", deleteShape);

export default router;