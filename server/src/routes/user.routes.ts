import { Router } from "express";
import { addNewUser, deleteUserByID, getAllUsers, getUserByID, updateUser} from "../controllers/user.controller";
import { signinUser } from "../controllers/user.authentication";
import { userSchema, userUpdateSchema } from "../validator/user.validator";
import { validate } from "../middleware/validation.middleware";
import { verifyJWT } from "../middleware/verify.JWT";
import { refreshToken } from "../controllers/user.refreshToken";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserByID);
router.delete("/users/:id", deleteUserByID);
router.post("/users", validate(userSchema), addNewUser);
router.put("/users/:id", validate(userUpdateSchema), updateUser);
router.post("/signin", signinUser);
router.post("/refresh", refreshToken);

export default router;