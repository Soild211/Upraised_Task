import {Router} from 'express';
import { getAllGadgets, createGadget, updateGadget , decommissionGadget , selfDestruct} from '../Controllers/gadget.controller.js';
import { authenticate } from '../Middleware/authMiddleware.js';
import { registerUser,loginUser } from '../Controllers/auth.controller.js';
const router=Router();
router.route("/gadgets").get(authenticate,getAllGadgets);
router.route("/gadgets").post(authenticate,createGadget);
router.route("/gadgets/:id").patch(authenticate,updateGadget);
router.route("/gadgets/:id").delete(authenticate,decommissionGadget);
router.route("/gadgets/:id/self-destruct").post(authenticate,selfDestruct);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
export default router;  