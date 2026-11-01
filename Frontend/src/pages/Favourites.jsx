
import React from "react"
import { useLoaderData } from "react-router-dom"
import PlaceItems from "../components/PlaceItems"
import "../styles/Home.css"

export default function Favourites() {

    const places = useLoaderData()

    return (
        <div className="feed-section">
            <h2 className="feed-title">
                My Favourite Travel Experiences ❤️
            </h2>

            {places.length === 0 ? (
                <p className="empty-favourites">
                    You haven't added any favourites yet.
                    Click the heart on a trip to save it here.
                </p>
            ) : (
                <PlaceItems places={places} />
            )}
        </div>
    )
}
