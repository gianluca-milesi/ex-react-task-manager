import { createPortal } from "react-dom"


function Modal({ title, content, show, onClose, onConfirm, confirmText = "Conferma" }) {

    if (!show) return null

    return createPortal(
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
            <div className="flex flex-col gap-2 justify-center items-center bg-white rounded-lg p-6 w-96 shadow-lg">
                <h2 className="text-xl">{title}</h2>
                <span>{content}</span>
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                        onClick={onClose}
                    >
                        Annulla
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal