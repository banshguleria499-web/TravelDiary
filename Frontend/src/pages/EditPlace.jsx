
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditPlace() {

    const [placeData, setPlaceData] = useState({
        title: "",
        location: "",
        category: "",
        experience: "",
        images: []
    })

    const [newFiles, setNewFiles] = useState([])

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/place/${id}`
                )

                const res = response.data

                setPlaceData({
                    title: res.title || "",
                    location: res.location || "",
                    category: res.category || "",
                    experience: res.experience || "",
                    images: res.images || []
                })
            } catch (err) {
                console.error("Error loading place:", err)
            }
        }

        getData()
    }, [id])

    const onHandleChange = (e) => {
        const { name, value } = e.target

        setPlaceData(pre => ({
            ...pre,
            [name]: value
        }))
    }

    const onHandleFileChange = (e) => {
        setNewFiles(Array.from(e.target.files))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append("title", placeData.title)
        formData.append("location", placeData.location)
        formData.append("category", placeData.category || "")
        formData.append("experience", placeData.experience)

        // Add selected new photos
        newFiles.forEach(file => {
            formData.append("file", file)
        })

        try {
            await axios.put(
                `http://localhost:3000/place/${id}`,
                formData,
                {
                    headers: {
                        authorization: 'bearer ' + localStorage.getItem("token")
                    }
                }
            )

            navigate("/myPlaces")
        } catch (err) {
            console.error("Error updating place:", err)
            alert("Could not update place. Please try again.")
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

                {/* Existing photos */}
                {placeData.images.length > 0 && (
                    <div className='form-control'>
                        <label>Current Photos</label>

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "10px"
                        }}>
                            {placeData.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:3000/images/${image}`}
                                    alt={`Place ${index + 1}`}
                                    style={{
                                        width: "120px",
                                        height: "100px",
                                        objectFit: "cover",
                                        borderRadius: "8px"
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Add new photos */}
                <div className='form-control'>
                    <label>Add More Photos</label>
                    <input
                        type="file"
                        className='input'
                        name="file"
                        accept="image/*"
                        multiple
                        onChange={onHandleFileChange}
                    />
                </div>

                {/* Show selected new photos */}
                {newFiles.length > 0 && (
                    <p>{newFiles.length} new photo(s) selected</p>
                )}

                <button type="submit">Edit Place</button>

            </form>
        </div>
    )
}
