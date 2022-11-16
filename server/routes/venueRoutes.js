import express from "express";
import app from "../app.js";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updatePassword,
} from "../controllers/authController.js";
import { deleteMe, getMe, updateMe } from "../controllers/userController.js";
import {
  createVenue,
  deleteVenue,
  getAllVenues,
  getVenue,
  updateVenue,
} from "../controllers/venueController.js";
import Venue from "../models/venueModel.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/signup", signup(Venue));
router.post("/login", login(Venue));
router.get("/logout", logout);

router.post("/forgotPassword", forgotPassword(Venue));
router.patch("/resetPassword/:token", resetPassword(Venue));

router.get("/", getAllVenues);
router.get("/:id", getVenue);

// PROTECTED AND RESTRICTED ROUTES
router.use(protect(Venue));
router.use(restrictTo("venue"));

router.get("/user/me", getMe, getVenue);
router.patch("/user/updateMyPassword", updatePassword(Venue));
router.patch("/user/updateMe", updateMe(Venue));
router.delete("/user/deleteMe", deleteMe(Venue));

// TODO: RESTRICT TO ADMINS
/* router.post("/", createVenue);
router.route("/:id").patch(updateVenue).delete(deleteVenue); */

export default router;
