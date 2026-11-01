import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import HomeFeed from "./pages/HomeFeed"
import AddPlace from './pages/AddPlace'
import EditPlace from './pages/EditPlace'
import PlaceDetails from './pages/PlaceDetails'
import Favourites from './pages/Favourites'

const getAllPlaces = async () => {
  try {
    const res = await axios.get('http://localhost:3000/place')
    return res.data || []
  } catch (err) {
    console.log(err)
    return []
  }
}


const getMyPlaces = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return [];

  const allPlaces = await getAllPlaces();

  return allPlaces.filter((item) => {
    if (!item.createdBy) return false; 

    let creator;

    if (typeof item.createdBy === "object") {
      creator = item.createdBy._id;
    } else {
      creator = item.createdBy;
    }

    return creator === user._id;
  });
};



const getFavPlaces = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return []

  return JSON.parse(
    localStorage.getItem(`fav_${user._id}`)
  ) || []
}

const getPlace = async ({ params }) => {
  try {
    let place;

    const res1 = await axios.get(`http://localhost:3000/place/${params.id}`)
    place = res1.data


    const userId =
      typeof place.createdBy === "object"
        ? place.createdBy._id
        : place.createdBy

    const res2 = await axios.get(`http://localhost:3000/user/${userId}`)
    console.log(place.createdBy)
    place = { ...place,
    email: res2.data.email,
    userName: res2.data.userName 
  }

    return place
  } catch (err) {
    console.log(err)
    return null
    
  }
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/feed", element: <HomeFeed />, loader: getAllPlaces },
      { path: "/myPlaces", element: <HomeFeed />, loader: getMyPlaces },
      { path: "/favPlaces", element: <HomeFeed />, loader: getFavPlaces },
      { path: "/addPlace", element: <AddPlace /> },
      { path: "/editPlace/:id", element: <EditPlace /> },
      { path: "/place/:id", element: <PlaceDetails />, loader: getPlace }
    ]
  }
])


export default function App() {
  return <RouterProvider router={router} />
}