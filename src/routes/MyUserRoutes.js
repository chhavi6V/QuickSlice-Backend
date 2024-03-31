import express from "express"
import MyUserController from "../controllers/MyUserController.js";
import { jwtCheck, jwtParse } from "../middleware/auth.js";
import { validateMyUserRequest } from "../middleware/validation.js";

const router = express.Router();

router.get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser);
router.post("/", jwtCheck, MyUserController.createCurrentUser);
router.put("/",jwtCheck, jwtParse, validateMyUserRequest, MyUserController.updateCurrentUser);

export default router;