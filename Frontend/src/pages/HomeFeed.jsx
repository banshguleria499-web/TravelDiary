import { useLoaderData } from "react-router-dom"
import PlaceItems from "../components/PlaceItems"
import "../styles/Home.css"

export default function HomeFeed(){

    const places = useLoaderData()

    return (
        <div className="feed-section">
            <h2 className="feed-title">
                Explore Travel Experiences
            </h2>

            <PlaceItems places={places}/>
        </div>
    )
}