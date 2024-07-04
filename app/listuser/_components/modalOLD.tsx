import { useState } from 'react'

interface ModalProps {
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed top-0 left-0  w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg shadow-md   p-4 w-full max-w-md"
        onClick={(event) => event.stopPropagation()}
      >
        {children}
        <button
          className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default Modal
