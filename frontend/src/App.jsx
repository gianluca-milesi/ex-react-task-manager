import { BrowserRouter, Routes, Route } from "react-router-dom"
//Contexts
import GlobalContext from "./contexts/GlobalContext.js"
//Hooks
import useTasks from "./hooks/useTasks.js"
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

  const taskData = useTasks()


  return (
    <GlobalContext.Provider value={{ ...taskData }}>
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