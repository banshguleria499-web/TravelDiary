import React from 'react'
import "../styles/Modal.css"

export default function Modal({ children, onClose }) {
  return (
    <div className="backdrop" onClick={onClose}>
      
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>

    </div>
  )
}