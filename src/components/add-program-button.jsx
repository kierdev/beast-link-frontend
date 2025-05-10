import { useState } from "react"

import AddProgramModal from "./add-program-modal"

export default function AddProgramButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Add Program
      </button>
      {isModalOpen && <AddProgramModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
