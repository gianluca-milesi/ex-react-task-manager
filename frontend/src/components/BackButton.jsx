import { useNavigate } from "react-router-dom"

function BackButton() {

    const navigate = useNavigate()

    return (
        <button className="bg-sky-500 text-white py-1 px-2 rounded hover:bg-sky-600 cursor-pointer ml-4"
            onClick={() => navigate(-1)}
        >
            Indietro
        </button>
    )
}

export default BackButton