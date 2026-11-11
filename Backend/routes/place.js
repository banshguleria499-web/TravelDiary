
const express = require("express");
const router = express.Router();

const {
    getPlaces,
    getMyPlaces,
    getPlace,
    addPlace,
    editPlace,
    deletePlace,
    toggleLike,
    addComment,
    upload
} = require("../controller/place");

const verifyToken = require("../middleware/auth");
const optionalAuth = require("../middleware/optionalAuth");

router.get("/", getPlaces);

router.get("/mine", verifyToken, getMyPlaces);

router.post(
    "/:id/like",
    verifyToken,
    toggleLike
);

router.post(
    "/:id/comment",
    verifyToken,
    addComment
);

router.get("/:id", optionalAuth, getPlace);

router.post(
    "/",
    verifyToken,
    upload.array("file", 10),
    addPlace
);

router.put(
    "/:id",
    verifyToken,
    upload.array("file", 10),
    editPlace
);

router.delete(
    "/:id",
    verifyToken,
    deletePlace
);

module.exports = router;
