import { BrowserRouter, Routes, Route } from "react-router-dom"
//Layouts
import DefaultLayout from "./layouts/DefaultLayout.jsx"
import BlankLayout from "./layouts/BlankLayout.jsx"
//Pages
import TaskList from "./pages/TaskList.jsx"
import AddTask from "./pages/AddTask.jsx"
import NotFound from "./pages/NotFound.jsx"


function App() {


  return (
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
  )
}

export default App