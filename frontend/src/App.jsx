import { BrowserRouter, Routes, Route } from "react-router-dom"
//Contexts
import GlobalContext from "./contexts/GlobalContext.js"
//Hooks
import { useEffect, useState } from "react"
//Layouts
import DefaultLayout from "./layouts/DefaultLayout.jsx"
import BlankLayout from "./layouts/BlankLayout.jsx"
//Pages
import TaskList from "./pages/TaskList.jsx"
import AddTask from "./pages/AddTask.jsx"
import NotFound from "./pages/NotFound.jsx"
//Environment variables
const apiUrl = import.meta.env.VITE_API_URL


function App() {

  const [tasks, setTasks] = useState([])

  async function fetchTasks() {
    try {
      const response = await fetch(`${apiUrl}/tasks`)
      if (!response.ok) {
        throw new Error("Errore nel recupero dei dati")
      }
      const tasksData = await response.json()
      setTasks(tasksData)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])


  return (
    <GlobalContext.Provider value={{ tasks }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<TaskList />} />
            <Route path="/add" element={<AddTask />} />
          </Route>
          <Route element={<BlankLayout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  )
}

export default App