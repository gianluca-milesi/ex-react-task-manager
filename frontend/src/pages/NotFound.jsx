import { Link } from "react-router-dom"


function NotFound() {
    return (
        <div>
            <h1>Pagina non trovata</h1>
            <Link to="/">Torna alla Home page</Link>
        </div>
    )
}

export default NotFound