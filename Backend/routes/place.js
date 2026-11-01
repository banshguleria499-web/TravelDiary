const express = require("express");
const router = express.Router();

const {
    getPlaces,
    getMyPlaces,
    getPlace,
    addPlace,
    editPlace,
    deletePlace,
    upload
} = require("../controller/place");

const verifyToken = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");

// Public places for Explore / Feed
router.get("/", getPlaces);

// Logged-in user's own places (public + private)
router.get("/mine", verifyToken, getMyPlaces);

// Single place details
// Public place: anyone can view
// Private place: only owner can view
router.get("/:id", optionalAuth, getPlace);

// Add a place
router.post(
    "/",
    verifyToken,
    upload.array("file", 10),
    addPlace
);

// Edit a place
router.put(
    "/:id",
    verifyToken,
    upload.array("file", 10),
    editPlace
);

// Delete a place
router.delete(
    "/:id",
    verifyToken,
    deletePlace
);

module.exports = router;