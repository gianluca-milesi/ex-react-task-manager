import { useState, useEffect } from "react"
const apiUrl = import.meta.env.VITE_API_URL


function useTasks() {

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

    function addTask(newTask) {

    }

    function removeTask(taskId) {

    }

    function updateTask() {

    }


    return { tasks, addTask, removeTask, updateTask }


}

export default useTasks