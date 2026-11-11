
import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
  FiArrowUpRight,
  FiMapPin,
  FiCamera,
  FiHeart,
  FiCompass,
  FiCalendar,
} from "react-icons/fi";

import Modal from "../components/Modal";
import InputForm from "../components/InputForm";
import PlaceItems from "../components/PlaceItems";
import "../styles/Home.css";

const destinations = [
  {
    name: "Shimla",
    state: "Himachal Pradesh",
    description: "Colonial charm, mountain views and cosy cafés.",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
    path: "/shimla",
    tag: "Mountain Escape",
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    description: "Snow-covered peaks, adventure and beautiful valleys.",
    image: "https://images.unsplash.com/photo-1626014303757-9b7c4a1b6b9b?auto=format&fit=crop&w=900&q=85",
    path: "/feed",
    tag: "Adventure",
  },
  {
    name: "Dharamshala",
    state: "Himachal Pradesh",
    description: "Peaceful monasteries and spectacular mountain scenery.",
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
    path: "/feed",
    tag: "Culture",
  },
  {
    name: "Kasol",
    state: "Himachal Pradesh",
    description: "Riverside walks, mountain cafés and scenic trails.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    path: "/feed",
    tag: "Nature",
  },
  {
    name: "Dalhousie",
    state: "Himachal Pradesh",
    description: "Pine forests, peaceful roads and old-world charm.",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85",
    path: "/feed",
    tag: "Slow Travel",
  },
  {
    name: "Spiti Valley",
    state: "Himachal Pradesh",
    description: "Dramatic landscapes and unforgettable high-altitude journeys.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
    path: "/feed",
    tag: "Offbeat",
  },
];

const itinerary = [
  {
    day: "01",
    title: "Discover the heart of Shimla",
    places: "The Ridge · Christ Church · Gaiety Theatre · Mall Road",
  },
  {
    day: "02",
    title: "Hills, temples and local markets",
    places: "Jakhoo Temple · Jakhoo Hill · Lakkar Bazaar · Tibetan Market",
  },
  {
    day: "03",
    title: "Heritage and slow moments",
    places: "Viceregal Lodge · Indian Coffee House · Himachali food",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const loadedPlaces = useLoaderData();
  const places = Array.isArray(loadedPlaces) ? loadedPlaces : [];

  const handleShare = () => {
    if (localStorage.getItem("token")) {
      navigate("/addPlace");
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="travel-home">

      <section className="travel-hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            YOUR NEXT STORY STARTS HERE
          </span>

          <h1>
            The world is a book.
            <br />
            <em>Go write your chapter.</em>
          </h1>

          <p className="hero-description">
            Find places worth remembering, discover the little
            details other travellers loved, and plan a journey
            that feels like yours.
          </p>

          <div className="hero-actions">
            <button
              className="primary-action"
              onClick={() => navigate("/feed")}
            >
              Explore experiences <FiArrowUpRight />
            </button>

            <button
              className="text-action"
              onClick={handleShare}
            >
              <FiCamera /> Share your journey
            </button>
          </div>

          <div className="hero-note">
            <span className="note-icon"><FiHeart /></span>
            Explore freely. Sharing is always your choice.
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-photo-wrap">
            <img
              className="hero-photo"
              src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1500&q=90"
              alt="Himalayan mountain landscape"
            />

            <div className="photo-shade" />

            <div className="photo-caption">
              <span>FEATURED ESCAPE</span>
              <strong>Somewhere in the Himalayas</strong>
              <small><FiMapPin /> Himachal Pradesh, India</small>
            </div>
          </div>

          <div className="floating-stamp">
            <FiMapPin />
            <span>Take the<br />scenic route</span>
          </div>

          <div className="hero-photo-index">01 <span>/</span> 03</div>
        </div>
      </section>

      <section className="intro-strip">
        <div>
          <span className="section-kicker">A LITTLE INSPIRATION</span>
          <h2>Not just places. <em>Possibilities.</em></h2>
        </div>

        <p>
          Discover destinations, hidden corners, local food
          and experiences shared by travellers.
        </p>
      </section>

      <section className="destination-section" id="destinations">
        <div className="section-heading">
          <div>
            <span className="section-kicker">DISCOVER HIMACHAL</span>
            <h2>Find your next <em>escape.</em></h2>
            <p className="destination-subtitle">
              Six destinations. Countless ways to explore.
            </p>
          </div>

          <button
            className="see-all"
            onClick={() => navigate("/feed")}
          >
            Explore stories <FiArrowUpRight />
          </button>
        </div>

        <div className="destination-grid">
          {destinations.map((place, index) => (
            <article className="destination-card" key={place.name}>
              <div className="destination-card-image">
                <img src={place.image} alt={place.name} loading="lazy" />
                <span className="destination-tag">{place.tag}</span>
                <span className="card-number">0{index + 1}</span>
              </div>

              <div className="destination-card-content">
                <span className="destination-state">
                  <FiMapPin /> {place.state}
                </span>

                <h3>{place.name}</h3>
                <p>{place.description}</p>

                <button
                  className="destination-link"
                  onClick={() => navigate(place.path)}
                >
                  Explore destination <FiArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shimla-feature">
        <div className="shimla-image">
          <img
            src="https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1400&q=85"
            alt="Mountain scenery"
          />
          <span className="image-tag">FEATURED DESTINATION</span>
        </div>

        <div className="shimla-copy">
          <span className="section-kicker">START SOMEWHERE BEAUTIFUL</span>

          <h2>
            Slow mornings &
            <br />
            <em>mountain evenings.</em>
          </h2>

          <p>
            Walk along the Ridge, discover local markets,
            find a cosy café and enjoy the mountain atmosphere.
            Let Shimla be your first stop.
          </p>

          <div className="destination-facts">
            <span><FiCalendar /> 3-day sample trip</span>
            <span><FiMapPin /> Himachal Pradesh</span>
          </div>

          <button
            className="outline-action"
            onClick={() => navigate("/shimla")}
          >
            Explore Shimla guide <FiArrowUpRight />
          </button>
        </div>
      </section>

      <section className="itinerary-section">
        <div className="itinerary-heading">
          <span className="section-kicker">A SAMPLE WAY TO WANDER</span>
          <h2>Three days in <em>Shimla.</em></h2>
          <p>A relaxed starting point for your own mountain getaway.</p>
        </div>

        <div className="itinerary-list">
          {itinerary.map((item) => (
            <div className="itinerary-row" key={item.day}>
              <span className="itinerary-day">DAY {item.day}</span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.places}</p>
              </div>

              <FiArrowUpRight className="itinerary-arrow" />
            </div>
          ))}
        </div>
      </section>

      <section className="share-banner">
        <div className="share-banner-icon"><FiCamera /></div>

        <div>
          <span className="section-kicker">YOUR STORY, YOUR CALL</span>
          <h2>
            Keep the memory.
            <br />
            <em>Share it when you're ready.</em>
          </h2>
          <p>
            Save a personal travel diary or publish it for
            other explorers. You decide.
          </p>
        </div>

        <button className="primary-action" onClick={handleShare}>
          Create a diary <FiArrowUpRight />
        </button>
      </section>

      {places.length > 0 && (
        <section className="community-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">FROM THE COMMUNITY</span>
              <h2>Fresh from <em>the road.</em></h2>
            </div>

            <button className="see-all" onClick={() => navigate("/feed")}>
              Explore all <FiArrowUpRight />
            </button>
          </div>

          <PlaceItems places={places} />
        </section>
      )}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
