import { useState } from "react"

import AddAcademicModal from "./add-academic-modal"

export default function AddAcademicButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Add Academic Year
      </button>
      {isModalOpen && <AddAcademicModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
