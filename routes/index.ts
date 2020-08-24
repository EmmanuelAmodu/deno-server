import { Router } from "https://deno.land/x/oak/mod.ts";
import controllers from "../controllers/index.ts";

const controls = new controllers();

const router = new Router();
router.get("/address-list", controls.listAddresses)
  .get("/shapes/:id", getShape)
  .post("/shapes", addShape)
  .put("/shapes/:id", updateShape)
  .delete("/shapes/:id", deleteShape);

export default router;
