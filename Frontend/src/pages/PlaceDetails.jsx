
import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'
import '../styles/PlaceDetails.css'

export default function PlaceDetails() {

  const place = useLoaderData()

  if (!place) {
    return <h2>Loading...</h2>
  }

  // Support both new trips (images array) and old trips (coverImage)
  const images = place.images?.length
    ? place.images
    : place.coverImage
      ? [place.coverImage]
      : []

  return (
    <div className='post-container'>

      {/* Header */}
      <div className='post-header'>
        <img src={profileImg} className='profile-img' />
        <div>
          <h5>{place.userName || "Unknown User"}</h5>
          <small>{place.email || "No Email"}</small>
        </div>
      </div>

      {/* Multiple Images */}
      <div className='post-images'>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:3000/images/${image}`}
              className='post-image'
              alt={`${place.title} - Photo ${index + 1}`}
            />
          ))
        ) : (
          <p>No photos added to this trip.</p>
        )}
      </div>

      {/* Details */}
      <div className='post-details'>
        <div className='info'>
          <h4>Location</h4>
          <span>{place.location || "No location"}</span>
        </div>

        <div className='info'>
          <h4>Category</h4>
          <span>{place.category || "No category"}</span>
        </div>
      </div>

      {/* Experience */}
      <div className='post-experience'>
        <h4>Experience</h4>
        <p>{place.experience || "No experience added"}</p>
      </div>

    </div>
  )
}
