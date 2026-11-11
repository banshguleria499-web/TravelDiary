
import React, { useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FiCompass,
  FiHeart,
  FiMap,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "../styles/Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let user = null;

  try {
    user = JSON.parse(
      localStorage.getItem("user") || "null"
    );
  } catch {
    user = null;
  }

  const handleAccount = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setMenuOpen(false);
      navigate("/");
      window.location.reload();
    } else {
      setIsOpen(true);
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="site-header">
        <NavLink
          to="/"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark">
            <FiCompass />
          </span>

          <span>
            travel<span>diary</span>
            <small>COLLECT MOMENTS, NOT THINGS</small>
          </span>
        </NavLink>

        <button
          className="mobile-menu-toggle"
          aria-label={
            menuOpen
              ? "Close navigation"
              : "Open navigation"
          }
          onClick={() =>
            setMenuOpen((open) => !open)
          }
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav
          className={`site-nav ${
            menuOpen ? "is-open" : ""
          }`}
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/shimla"
            onClick={closeMenu}
          >
            Shimla Guide
          </NavLink>

          <NavLink
            to="/feed"
            onClick={closeMenu}
          >
            Explore
          </NavLink>

          <NavLink
            to={token ? "/myPlaces" : "/"}
            onClick={() => {
              if (!token) setIsOpen(true);
              closeMenu();
            }}
          >
            <FiMap /> My places
          </NavLink>

          <NavLink
            to={token ? "/favPlaces" : "/"}
            onClick={() => {
              if (!token) setIsOpen(true);
              closeMenu();
            }}
          >
            <FiHeart /> Saved
          </NavLink>

          <button
            className="account-button"
            onClick={handleAccount}
          >
            {token ? <FiLogOut /> : <FiLogIn />}

            {token
              ? user?.userName || "Logout"
              : "Login"}
          </button>
        </nav>
      </header>

      {isOpen && (
        <Modal
          onClose={() => setIsOpen(false)}
        >
          <InputForm
            setIsOpen={() => {
              setIsOpen(false);
              window.location.reload();
            }}
          />
        </Modal>
      )}
    </>
  );
}
