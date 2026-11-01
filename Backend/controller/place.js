const Places = require("../models/place");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure images folder exists
const imagesPath = path.join(__dirname, "../public/images");

if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath, { recursive: true });
}

// Configure image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagesPath);
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

// Accept image files only
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


// Get public places for Explore / Feed
const getPlaces = async (req, res) => {
    try {
        const places = await Places.find({
            isPublic: true
        }).populate("createdBy", "userName email");

        return res.json(places);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


// Get single place
const getPlace = async (req, res) => {
    try {
        const place = await Places.findById(req.params.id)
            .populate("createdBy", "userName email");

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        // Public places can be viewed by everyone
        if (place.isPublic) {
            return res.json(place);
        }

        // Private places can only be viewed by their owner
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
        return res.status(500).json({
            message: err.message
        });
    }
};


// Get logged-in user's places (public + private)
const getMyPlaces = async (req, res) => {
    try {
        const places = await Places.find({
            createdBy: req.user.id
        }).populate("createdBy", "userName email");

        return res.json({
            places: places
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


// Add a place
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

        // Checkbox sends "true" or "false" as a string
        // If checkbox is unchecked, it becomes false
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
        return res.status(500).json({
            message: err.message
        });
    }
};


// Edit a place
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

        // Only the owner can edit the place
        if (
            place.createdBy.toString() !== req.user.id.toString()
        ) {
            return res.status(403).json({
                message: "You are not allowed to edit this place"
            });
        }

        // Keep existing photos and add newly uploaded photos
        const newImages = req.files
            ? req.files.map(file => file.filename)
            : [];

        const images = [
            ...(place.images || []),
            ...newImages
        ];

        place.title = title || place.title;
        place.location = location || place.location;
        place.experience = experience || place.experience;
        place.category = category ?? place.category;

        // Update visibility only if field was sent
        if (req.body.isPublic !== undefined) {
            place.isPublic = req.body.isPublic !== "false";
        }

        place.images = images;

        await place.save();

        return res.json(place);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


// Delete a place
const deletePlace = async (req, res) => {
    try {
        const place = await Places.findById(req.params.id);

        if (!place) {
            return res.status(404).json({
                message: "Place not found"
            });
        }

        // Only the owner can delete the place
        if (
            place.createdBy.toString() !== req.user.id.toString()
        ) {
            return res.status(403).json({
                message: "You are not allowed to delete this place"
            });
        }

        await Places.findByIdAndDelete(req.params.id);

        return res.json({
            status: "ok"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};


module.exports = {
    getPlaces,
    getMyPlaces,
    getPlace,
    addPlace,
    editPlace,
    deletePlace,
    upload
};