import Header from "./Header.jsx"
import { Outlet } from "react-router-dom"


function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default DefaultLayout