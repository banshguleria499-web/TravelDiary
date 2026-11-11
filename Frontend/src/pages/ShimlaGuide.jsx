
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiArrowUpRight,
  FiClock,
  FiCamera,
  FiCoffee,
  FiShoppingBag,
  FiNavigation,
} from "react-icons/fi";
import "../styles/ShimlaGuide.css";

const attractions = [
  {
    name: "The Ridge",
    category: "Landmark",
    description:
      "The heart of Shimla, known for open mountain views, beautiful surroundings and evening walks.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Christ Church",
    category: "Heritage",
    description:
      "A beautiful neo-Gothic church overlooking the Ridge and one of Shimla's most recognisable landmarks.",
    image:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Jakhoo Temple",
    category: "Spiritual",
    description:
      "A hilltop temple offering panoramic views of Shimla and the surrounding mountains.",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Viceregal Lodge",
    category: "History",
    description:
      "A historic building surrounded by beautiful gardens, architecture and colonial-era stories.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kufri",
    category: "Nature",
    description:
      "A popular mountain getaway near Shimla, known for scenic landscapes and outdoor activities.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mall Road",
    category: "Shopping & Walks",
    description:
      "Explore shops, cafés, local food and the lively atmosphere of Shimla's central street.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
  },
];

const foodPlaces = [
  {
    name: "Indian Coffee House",
    type: "Classic café",
    description: "A nostalgic stop for coffee, simple meals and old Shimla atmosphere.",
  },
  {
    name: "Wake & Bake",
    type: "Café",
    description: "A popular café option around Mall Road for breakfast and relaxed meals.",
  },
  {
    name: "Himachali Rasoi",
    type: "Local cuisine",
    description: "A place to look for traditional Himachali food and local flavours.",
  },
  {
    name: "Hide Out Cafe",
    type: "Café",
    description: "A cosy café option for a relaxed break while exploring the town.",
  },
];

const markets = [
  {
    name: "Lakkar Bazaar",
    description: "Known for wooden handicrafts, walking sticks, souvenirs and local shopping.",
  },
  {
    name: "Tibetan Market",
    description: "Explore clothing, accessories, souvenirs and small local shops.",
  },
  {
    name: "Mall Road",
    description: "A lively shopping street with boutiques, cafés and local stores.",
  },
  {
    name: "Himachal Emporium",
    description: "A place to explore Himachali handicrafts, woollens and traditional products.",
  },
];

const itinerary = [
  {
    day: "01",
    title: "Explore the heart of Shimla",
    time: "Full day",
    places: [
      "The Ridge",
      "Christ Church",
      "Gaiety Heritage Cultural Complex",
      "Mall Road",
    ],
  },
  {
    day: "02",
    title: "Temples, viewpoints and markets",
    time: "Full day",
    places: [
      "Jakhoo Temple",
      "Jakhoo Hill viewpoint",
      "Lakkar Bazaar",
      "Tibetan Market",
    ],
  },
  {
    day: "03",
    title: "Heritage and local experiences",
    time: "Full day",
    places: [
      "Viceregal Lodge",
      "Indian Coffee House",
      "Local shopping",
      "Himachali food",
    ],
  },
];

export default function ShimlaGuide() {
  const navigate = useNavigate();

  return (
    <main className="shimla-page">

      {/* HERO */}
      <section className="shimla-hero">
        <img
          src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2000&q=90"
          alt="Himalayan mountain landscape"
        />

        <div className="shimla-hero-overlay" />

        <div className="shimla-hero-content">
          <span className="shimla-eyebrow">
            <FiMapPin /> HIMACHAL PRADESH, INDIA
          </span>

          <h1>
            Discover
            <br />
            <em>Shimla.</em>
          </h1>

          <p>
            Where mountain mornings, colonial charm,
            local markets and unforgettable views come together.
          </p>

          <button
            className="shimla-hero-button"
            onClick={() =>
              document
                .getElementById("shimla-attractions")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Start exploring <FiArrowUpRight />
          </button>
        </div>

        <div className="shimla-hero-bottom">
          <span>THE QUEEN OF HILLS</span>
          <span>31.1048° N · 77.1734° E</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="shimla-intro">
        <div>
          <span className="shimla-kicker">A PLACE TO SLOW DOWN</span>
          <h2>
            More than a destination.
            <br />
            <em>A feeling.</em>
          </h2>
        </div>

        <p>
          Shimla is a beautiful blend of mountain scenery,
          heritage architecture, bustling streets and peaceful
          corners. Whether you love exploring, shopping, food
          or simply enjoying the views, there's something here
          for every kind of traveller.
        </p>
      </section>

      {/* ATTRACTIONS */}
      <section className="shimla-attractions" id="shimla-attractions">
        <div className="shimla-section-heading">
          <div>
            <span className="shimla-kicker">THE PLACES TO REMEMBER</span>
            <h2>Explore the <em>highlights.</em></h2>
            <p>Start with these well-known places around Shimla.</p>
          </div>
          <span className="shimla-section-count">06 PLACES</span>
        </div>

        <div className="shimla-attraction-grid">
          {attractions.map((place, index) => (
            <article className="shimla-attraction-card" key={place.name}>
              <div className="shimla-attraction-image">
                <img
                  src={place.image}
                  alt={place.name}
                  loading="lazy"
                />
                <span>0{index + 1}</span>
              </div>

              <div className="shimla-attraction-info">
                <span className="shimla-card-category">
                  {place.category}
                </span>
                <h3>{place.name}</h3>
                <p>{place.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOD */}
      <section className="shimla-food">
        <div className="shimla-food-heading">
          <span className="shimla-kicker">A TASTE OF SHIMLA</span>
          <h2>Good food. <em>Good memories.</em></h2>
          <p>
            Take a break from exploring and discover the café
            culture and local flavours of Shimla.
          </p>
        </div>

        <div className="shimla-food-grid">
          {foodPlaces.map((place) => (
            <article className="shimla-food-card" key={place.name}>
              <span className="shimla-food-icon">
                <FiCoffee />
              </span>
              <span>{place.type}</span>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </article>
          ))}
        </div>

        <p className="shimla-disclaimer">
          These are suggested places to explore. Check current
          opening hours and availability before visiting.
        </p>
      </section>

      {/* SHOPPING */}
      <section className="shimla-markets">
        <div className="shimla-market-heading">
          <span className="shimla-kicker">TAKE A LITTLE SHIMLA HOME</span>
          <h2>Markets & <em>local finds.</em></h2>
        </div>

        <div className="shimla-market-grid">
          {markets.map((market, index) => (
            <article className="shimla-market-card" key={market.name}>
              <span className="shimla-market-number">0{index + 1}</span>
              <FiShoppingBag />
              <h3>{market.name}</h3>
              <p>{market.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ITINERARY */}
      <section className="shimla-itinerary">
        <div className="shimla-itinerary-intro">
          <span className="shimla-kicker">MAKE THE MOST OF YOUR TRIP</span>
          <h2>
            Three days.
            <br />
            <em>One beautiful journey.</em>
          </h2>
          <p>
            A sample itinerary to help you plan your first
            Shimla visit. Adjust it according to your interests
            and travel pace.
          </p>
          <span className="shimla-duration">
            <FiClock /> SUGGESTED 3-DAY PLAN
          </span>
        </div>

        <div className="shimla-itinerary-list">
          {itinerary.map((item) => (
            <article className="shimla-itinerary-item" key={item.day}>
              <span className="shimla-day-number">{item.day}</span>

              <div className="shimla-day-content">
                <span>{item.time}</span>
                <h3>{item.title}</h3>

                <ul>
                  {item.places.map((place) => (
                    <li key={place}>{place}</li>
                  ))}
                </ul>
              </div>

              <FiArrowUpRight className="shimla-day-arrow" />
            </article>
          ))}
        </div>
      </section>

      {/* MAP */}
      <section className="shimla-map-section">
        <div className="shimla-map-heading">
          <span className="shimla-kicker">FIND YOUR WAY AROUND</span>
          <h2>Shimla, <em>on the map.</em></h2>
          <p>
            Explore the town and find your route to the places
            you want to visit.
          </p>
        </div>

        <div className="shimla-map-frame">
          <iframe
            title="Map of Shimla"
            src="https://www.openstreetmap.org/export/embed.html?bbox=77.12%2C31.06%2C77.22%2C31.13&layer=mapnik&marker=31.1048%2C77.1734"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          className="shimla-map-link"
          href="https://www.openstreetmap.org/?mlat=31.1048&mlon=77.1734#map=14/31.1048/77.1734"
          target="_blank"
          rel="noreferrer"
        >
          Open larger map <FiNavigation />
        </a>
      </section>

      {/* COMMUNITY CTA */}
      <section className="shimla-community">
        <div>
          <span className="shimla-kicker">YOUR SHIMLA STORY</span>
          <h2>
            Have you been here?
            <br />
            <em>Tell your story.</em>
          </h2>
          <p>
            Discover experiences shared by other travellers
            or add your own when you feel like sharing.
          </p>
        </div>

        <div className="shimla-community-actions">
          <button onClick={() => navigate("/feed")}>
            Explore travel stories <FiArrowUpRight />
          </button>

          <button
            className="shimla-secondary-button"
            onClick={() => navigate("/")}
          >
            Back to homepage
          </button>
        </div>
      </section>

    </main>
  );
}
