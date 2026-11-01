
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/AddPlace.css"

export default function AddPlace() {

    const [placeData, setPlaceData] = useState({
        title: "",
        location: "",
        category: "",
        experience: "",
        file: [],
        isPublic: true
    })

    const navigate = useNavigate()

    const onHandleChange = (e) => {
        const { name, value, files, type, checked } = e.target

        const val =
            type === "file"
                ? Array.from(files)
                : type === "checkbox"
                    ? checked
                    : value

        setPlaceData(pre => ({
            ...pre,
            [name]: val
        }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("title", placeData.title)
        formData.append("location", placeData.location)
        formData.append("category", placeData.category || "")
        formData.append("experience", placeData.experience)
        formData.append("isPublic", String(placeData.isPublic))

        if (placeData.file) {
            placeData.file.forEach(file => {
                formData.append("file", file)
            })
        }

        try {
            await axios.post(
                "http://localhost:3000/place",
                formData,
                {
                    headers: {
                        authorization:
                            'bearer ' + localStorage.getItem("token")
                    }
                }
            )

            navigate("/myPlaces")

        } catch (err) {
            console.error(
                "Failed to add place:",
                err.response?.data || err.message
            )

            alert("Could not add the trip. Please try again.")
        }
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>

                <div className='form-control'>
                    <label>Place Title</label>
                    <input
                        type="text"
                        className='input'
                        name="title"
                        value={placeData.title}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className='form-control'>
                    <label>Location</label>
                    <input
                        type="text"
                        className='input'
                        name="location"
                        value={placeData.location}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className='form-control'>
                    <label>Category</label>
                    <input
                        type="text"
                        className='input'
                        name="category"
                        placeholder="Mountain / Beach / City"
                        value={placeData.category}
                        onChange={onHandleChange}
                    />
                </div>

                <div className='form-control'>
                    <label>Experience</label>
                    <textarea
                        className='input-textarea'
                        name="experience"
                        rows="5"
                        value={placeData.experience}
                        onChange={onHandleChange}
                        required
                    />
                </div>

                <div className='form-control'>
                    <label>Place Images</label>
                    <input
                        type="file"
                        className='input'
                        name="file"
                        accept="image/*"
                        multiple
                        onChange={onHandleChange}
                    />
                </div>

                {/* Public or private visibility */}
                <div className='form-control'>
                    <label>
                        <input
                            type="checkbox"
                            name="isPublic"
                            checked={placeData.isPublic}
                            onChange={onHandleChange}
                        />

                        Share this trip publicly
                    </label>

                    <small>
                        If unchecked, this trip will only be visible
                        in your My Places.
                    </small>
                </div>

                <button type="submit">
                    Add Place
                </button>

            </form>
        </div>
    )
}
