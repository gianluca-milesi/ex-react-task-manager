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

    async function addTask(newTask) {
        const response = await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        const { success, message, task } = await response.json()
        if (!success) throw new Error(message)

        setTasks([...tasks, newTask])
    }

    function removeTask(taskId) {

    }

    function updateTask() {

    }


    return { tasks, setTasks, addTask, removeTask, updateTask }


}

export default useTasks