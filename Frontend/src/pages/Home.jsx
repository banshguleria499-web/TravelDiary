import React, { useState } from 'react'
import travelPhoto from '../assets/travel bg.png'
import { useNavigate, useLoaderData } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import PlaceItems from '../components/PlaceItems'
import "../styles/Home.css"

export default function Home() {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const places = useLoaderData()   // IMPORTANT

    const addPlace = () => {
        let token = localStorage.getItem("token")

        if (token)
            navigate("/addPlace")
        else
            setIsOpen(true)
    }

    return (
        <>
            <section className='home'>

                <div className='hero'>
                    <h1>Travel Diaries</h1>

                    <h5>
                        Discover amazing places shared by travelers around the world.
                        Share your experiences, explore new destinations, and save your
                        favorite travel memories all in one place.
                    </h5>

                    <div className='buttons'>
                        <button onClick={addPlace}>
                            Share Your Experience
                        </button>

                        <button
                            className="explore-btn"
                            onClick={() => navigate("/feed")}
                        >
                            Explore Travel Experiences
                        </button>
                    </div>
                </div>

                <div className='right'>
                    <img
                        src={travelPhoto}
                        alt="travel"
                    />
                </div>

            </section>

            <div className='bg'></div>

            {/* yaha posts render honge */}
            <PlaceItems places={places} />

            {
                isOpen &&
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={() => setIsOpen(false)} />
                </Modal>
            }
        </>
    )
}