
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaHeart } from "react-icons/fa6"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import axios from 'axios'
import "../styles/PlaceItems.css"

export default function PlaceItems({ places }) {

    const [allPlaces, setAllPlaces] = useState([])
    const [favItems, setFavItems] = useState([])

    const navigate = useNavigate()

    const path = window.location.pathname === "/myPlaces"

    const user = JSON.parse(localStorage.getItem("user") || "null")
    const favKey = `fav_${user?._id}`

    // Load favourites when the component mounts
    useEffect(() => {
        setAllPlaces(places || [])

        if (user?._id) {
            const savedFavs = JSON.parse(
                localStorage.getItem(favKey) || "[]"
            )

            setFavItems(savedFavs)
        }
    }, [places, favKey, user?._id])

    // Add or remove a favourite
    const favPlace = (item) => {

        if (!user?._id) {
            alert("Please login to save favourites.")
            return
        }

        const isAlreadyFav = favItems.some(
            place => place._id === item._id
        )

        let updatedFavs

        if (isAlreadyFav) {
            updatedFavs = favItems.filter(
                place => place._id !== item._id
            )
        } else {
            updatedFavs = [...favItems, item]
        }

        // Update React state
        setFavItems(updatedFavs)

        // Save favourites in localStorage
        localStorage.setItem(
            favKey,
            JSON.stringify(updatedFavs)
        )
    }

    // Delete a trip
    const onDelete = async (id) => {
        try {
            await axios.delete(
                `http://localhost:3000/place/${id}`,
                {
                    headers: {
                        authorization:
                            'bearer ' + localStorage.getItem("token")
                    }
                }
            )

            setAllPlaces(prev =>
                prev.filter(place => place._id !== id)
            )

            const updatedFavs = favItems.filter(
                place => place._id !== id
            )

            setFavItems(updatedFavs)

            localStorage.setItem(
                favKey,
                JSON.stringify(updatedFavs)
            )

        } catch (err) {
            console.error(
                "Delete failed:",
                err.response?.data || err.message
            )

            alert("Could not delete the trip. Please try again.")
        }
    }

    return (
        <div className='card-container'>

            {allPlaces?.map((item) => {

                const isFavourite = favItems.some(
                    place => place._id === item._id
                )

                return (
                    <div
                        key={item._id}
                        className='card'
                        onDoubleClick={() =>
                            navigate(`/place/${item._id}`)
                        }
                    >

                        <img
                            src={`http://localhost:3000/images/${
                                item.images?.length
                                    ? item.images[0]
                                    : item.coverImage || "default.jpg"
                            }`}
                            width="120px"
                            height="100px"
                            alt={item.title}
                        />

                        <div className='card-body'>

                            <div className='userName'>
                                {item.createdBy?.userName}
                            </div>

                            <div className='title'>
                                {item.title}
                            </div>

                            <div className='icons'>

                                <div className='experience'>
                                    {item.experience?.slice(0, 60)}...
                                </div>

                                {!path ? (

                                    <FaHeart
                                        className='heart-icon'
                                        size={20}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            favPlace(item)
                                        }}
                                        style={{
                                            color: isFavourite ? "red" : "gray",
                                            cursor: "pointer"
                                        }}
                                    />

                                ) : (

                                    <div className='action'>

                                        <Link
                                            to={`/editPlace/${item._id}`}
                                            className="editIcon"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            <FaEdit />
                                        </Link>

                                        <MdDelete
                                            onClick={(e) => {
                                                e.stopPropagation()

                                                const confirmDelete =
                                                    window.confirm(
                                                        "Are you sure you want to delete this trip?"
                                                    )

                                                if (confirmDelete) {
                                                    onDelete(item._id)
                                                }
                                            }}
                                            className='deleteIcon'
                                        />

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>
                )
            })}

        </div>
    )
}
