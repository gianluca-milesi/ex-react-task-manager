import { NavLink } from "react-router-dom"


function Navbar() {
    return (
        <nav className="flex justify-center gap-4">
            <NavLink to="/">Lista Task</NavLink>
            <NavLink to="/add">Aggiungi Task</NavLink>
        </nav>
    )
}

export default Navbar