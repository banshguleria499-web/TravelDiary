
import React from "react";
import "./App.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from "./pages/Home";
import ShimlaGuide from "./pages/ShimlaGuide";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";

import HomeFeed from "./pages/HomeFeed";
import AddPlace from "./pages/AddPlace";
import EditPlace from "./pages/EditPlace";
import PlaceDetails from "./pages/PlaceDetails";

const getAllPlaces = async () => {
  try {
    const res = await axios.get("http://localhost:3000/place");
    return res.data || [];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getMyPlaces = async () => {
  let user;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!user) return [];

  const allPlaces = await getAllPlaces();

  return allPlaces.filter((item) => {
    if (!item.createdBy) return false;

    const creator =
      typeof item.createdBy === "object"
        ? item.createdBy._id
        : item.createdBy;

    return creator === user._id;
  });
};

const getFavPlaces = () => {
  let user;

  try {
    user = JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  if (!user) return [];

  try {
    return JSON.parse(
      localStorage.getItem(`fav_${user._id}`) || "[]"
    );
  } catch {
    return [];
  }
};

const getPlace = async ({ params }) => {
  try {
    const res1 = await axios.get(
      `http://localhost:3000/place/${params.id}`
    );

    const place = res1.data;

    const userId =
      typeof place.createdBy === "object"
        ? place.createdBy._id
        : place.createdBy;

    const res2 = await axios.get(
      `http://localhost:3000/user/${userId}`
    );

    return {
      ...place,
      email: res2.data.email,
      userName: res2.data.userName,
    };
  } catch (err) {
    console.log(err);
    return null;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shimla",
        element: <ShimlaGuide />,
      },
      {
        path: "/feed",
        element: <HomeFeed />,
        loader: getAllPlaces,
      },
      {
        path: "/myPlaces",
        element: <HomeFeed />,
        loader: getMyPlaces,
      },
      {
        path: "/favPlaces",
        element: <HomeFeed />,
        loader: getFavPlaces,
      },
      {
        path: "/addPlace",
        element: <AddPlace />,
      },
      {
        path: "/editPlace/:id",
        element: <EditPlace />,
      },
      {
        path: "/place/:id",
        element: <PlaceDetails />,
        loader: getPlace,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
