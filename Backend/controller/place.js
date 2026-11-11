
const Places = require("../models/place");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imagesPath = path.join(__dirname, "../public/images");

if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath);
    },
    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        files: 10,
        fileSize: 5 * 1024 * 1024
    }
});

// GET PUBLIC PLACES
const getPlaces = async (req, res) => {
    try {
        const places = await Places.find({
            isPublic: true
        }).populate("createdBy", "userName email");

        return res.json(places);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// GET SINGLE PLACE
const getPlace = async (req, res) => {
    try {
        const place = await Places.findById(req.params.id)
            .populate("createdBy", "userName email");

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        if (place.isPublic) {
            return res.json(place);
        }

        const userId = req.user?.id;

        if (
            !userId ||
            !place.createdBy ||
            place.createdBy._id.toString() !== userId.toString()
        ) {
            return res.status(403).json({
                message: "This place is private"
            });
        }

        return res.json(place);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// GET MY PLACES
const getMyPlaces = async (req, res) => {
    try {
        const places = await Places.find({
            createdBy: req.user.id
        }).populate("createdBy", "userName email");

        return res.json({ places });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ADD PLACE
const addPlace = async (req, res) => {
    try {
        const {
            title,
            location,
            experience,
            category
        } = req.body;

        if (!title || !location || !experience) {
            return res.status(400).json({
                message: "Title, location and experience are required"
            });
        }

        const images = req.files
            ? req.files.map(file => file.filename)
            : [];

        const isPublic = req.body.isPublic !== "false";

        const newPlace = await Places.create({
            title,
            location,
            experience,
            category,
            images,
            isPublic,
            createdBy: req.user.id
        });

        return res.status(201).json(newPlace);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// EDIT PLACE
const editPlace = async (req, res) => {
    try {
        const {
            title,
            location,
            experience,
            category
        } = req.body;

        const place = await Places.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        if (
            place.createdBy.toString() !== req.user.id.toString()
        ) {
            return res.status(403).json({
                message: "You are not allowed to edit this place"
            });
        }

        const newImages = req.files
            ? req.files.map(file => file.filename)
            : [];

        place.images = [
            ...(place.images || []),
            ...newImages
        ];

        place.title = title || place.title;
        place.location = location || place.location;
        place.experience = experience || place.experience;
        place.category = category ?? place.category;

        if (req.body.isPublic !== undefined) {
            place.isPublic = req.body.isPublic !== "false";
        }

        await place.save();

        return res.json(place);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// DELETE PLACE
const deletePlace = async (req, res) => {
    try {
        const place = await Places.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        if (
            place.createdBy.toString() !== req.user.id.toString()
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this place"
            });
        }

        await Places.findByIdAndDelete(req.params.id);

        return res.json({ status: "ok" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// LIKE / UNLIKE PLACE
const toggleLike = async (req, res) => {
    try {
        const place = await Places.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        const userId = req.user.id;

        const alreadyLiked = place.likes.some(
            id => id.toString() === userId.toString()
        );

        if (alreadyLiked) {
            place.likes = place.likes.filter(
                id => id.toString() !== userId.toString()
            );
        } else {
            place.likes.push(userId);
        }

        await place.save();

        return res.json({
            liked: !alreadyLiked,
            likesCount: place.likes.length
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// ADD COMMENT
const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                message: "Comment cannot be empty"
            });
        }

        const place = await Places.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        const User = require("../models/user");
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        place.comments.push({
            user: user._id,
            userName: user.userName,
            text: text.trim()
        });

        await place.save();

        return res.status(201).json({
            message: "Comment added successfully",
            comments: place.comments
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getPlaces,
    getMyPlaces,
    getPlace,
    addPlace,
    editPlace,
    deletePlace,
    toggleLike,
    addComment,
    upload
};
