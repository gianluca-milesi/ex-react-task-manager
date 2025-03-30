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
        const taskExists = tasks.some(t => t.title === newTask.title)
        if (taskExists) {
            throw new Error("Esiste già una task con questo nome")
        }

        const response = await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        })
        const { success, message, task } = await response.json()
        if (!success) throw new Error(message)

        setTasks([...tasks, task])
    }

    async function removeTask(taskId) {
        const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
            method: "DELETE"
        })
        const { success, message } = await response.json()
        if (!success) throw new Error(message)

        setTasks(prev => prev.filter(t => t.id !== taskId))
    }

    async function removeMultipleTasks(taskIds) {
        const deleteRequests = taskIds.map(taskId =>
            fetch(`${apiUrl}/tasks/${taskId}`, { method: "DELETE" }).then(res => res.json())
        )

        const results = await Promise.allSettled(deleteRequests)

        const fulfilledDeletions = []
        const rejectedDeletions = []

        results.forEach((r, i) => {
            const taskId = taskIds[i]
            if (r.status === "fulfilled" && r.value.success) {
                fulfilledDeletions.push(taskId)
            } else {
                rejectedDeletions.push(taskId)
            }
        })
        if (fulfilledDeletions.length > 0) {
            setTasks(prev => prev.filter(t => !fulfilledDeletions.includes(t.id)))
        }
        if (rejectedDeletions.length > 0) {
            throw new Error(`Errore nell'eliminazione delle task: ${rejectedDeletions.join(", ")}`)
        }
    }

    async function updateTask(updatedTask) {
        const taskExists = tasks.find(t => t.title === updatedTask.title)
        if (taskExists && taskExists.id !== updatedTask.id) {
            throw new Error("Esiste già una task con questo nome")
        }

        const response = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask)
        })
        const { success, message, task } = await response.json()
        if (!success) throw new Error(message)

        setTasks(prev => prev.map(t => t.id === updatedTask.id ? task : t))
    }


    return { tasks, setTasks, addTask, removeTask, updateTask, removeMultipleTasks }
}

export default useTasks