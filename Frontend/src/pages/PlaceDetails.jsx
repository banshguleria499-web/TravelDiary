
import React, { useState } from "react";
import axios from "axios";
import profileImg from "../assets/profile.png";
import { useLoaderData } from "react-router-dom";
import "../styles/PlaceDetails.css";

const API = "http://localhost:3000";

export default function PlaceDetails() {
    const place = useLoaderData();

    const [comments, setComments] = useState(place?.comments || []);
    const [likesCount, setLikesCount] = useState(place?.likes?.length || 0);
    const [liked, setLiked] = useState(
        place?.likes?.some(
            id => id.toString() ===
                JSON.parse(localStorage.getItem("user") || "null")?._id
        ) || false
    );

    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(false);

    if (!place) {
        return <h2>Unable to load this travel story.</h2>;
    }

    const token = localStorage.getItem("token");

    const images = place.images?.length
        ? place.images
        : place.coverImage
            ? [place.coverImage]
            : [];

    const handleLike = async () => {
        if (!token) {
            alert("Please login to like this story.");
            return;
        }

        try {
            const response = await axios.post(
                `${API}/place/${place._id}/like`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLiked(response.data.liked);
            setLikesCount(response.data.likesCount);
        } catch (error) {
            alert(error.response?.data?.message || "Unable to like this story.");
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Please login to comment.");
            return;
        }

        if (!commentText.trim()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${API}/place/${place._id}/comment`,
                { text: commentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComments(response.data.comments);
            setCommentText("");
        } catch (error) {
            alert(error.response?.data?.message || "Unable to add comment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="post-container">

            <div className="post-header">
                <img
                    src={profileImg}
                    className="profile-img"
                    alt="User profile"
                />

                <div>
                    <h5>{place.createdBy?.userName || place.userName || "Traveler"}</h5>
                    <small>{place.location}</small>
                </div>
            </div>

            <div className="post-images">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <img
                            key={index}
                            src={`${API}/images/${image}`}
                            className="post-image"
                            alt={`${place.title} - Photo ${index + 1}`}
                        />
                    ))
                ) : (
                    <p>No photos added to this trip.</p>
                )}
            </div>

            <div className="post-details">
                <div className="info">
                    <h4>{place.title}</h4>
                    <span>{place.location}</span>
                </div>

                <div className="info">
                    <h4>Category</h4>
                    <span>{place.category || "Travel"}</span>
                </div>
            </div>

            <div className="post-experience">
                <h4>Travel Experience</h4>
                <p>{place.experience}</p>
            </div>

            <div className="social-actions">
                <button
                    className={liked ? "like-button liked" : "like-button"}
                    onClick={handleLike}
                >
                    {liked ? "♥ Liked" : "♡ Like"} · {likesCount}
                </button>

                <span>{comments.length} Comments</span>
            </div>

            <section className="comments-section">
                <h3>Comments</h3>

                <form onSubmit={handleComment} className="comment-form">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        maxLength={500}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>

                <div className="comments-list">
                    {comments.length === 0 ? (
                        <p className="no-comments">
                            No comments yet. Be the first to comment!
                        </p>
                    ) : (
                        [...comments].reverse().map((comment) => (
                            <div className="comment-item" key={comment._id}>
                                <strong>{comment.userName}</strong>
                                <p>{comment.text}</p>
                                <small>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </small>
                            </div>
                        ))
                    )}
                </div>
            </section>

        </div>
    );
}
