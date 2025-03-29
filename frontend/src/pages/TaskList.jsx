//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useCallback, useContext, useMemo, useState } from "react"
//Components
import TaskRow from "../components/TaskRow.jsx"

function debounce(callback, delay) {
    let timer
    return (value) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}


function TaskList() {

    const { tasks, removeMultipleTasks } = useContext(GlobalContext)
    const [sortBy, setSortBy] = useState("createdAt")
    const [sortOrder, setSortOrder] = useState(1)
    const [query, setQuery] = useState("")
    const debouncedSetQuery = useCallback(debounce(setQuery, 300), [])

    function handleSort(field) {
        if (sortBy === field) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(field)
            setSortOrder(1)
        }
    }

    const sortIcon = sortOrder === 1 ? "↓" : "↑"

    const filteredAndSortedTask = useMemo(() => {
        return [...tasks]
            .filter(t => t.title.toLowerCase().includes(query.toLocaleLowerCase()))
            .sort((a, b) => {
                let comparison

                if (sortBy === "title") {
                    comparison = a.title.localeCompare(b.title)
                }
                if (sortBy === "status") {
                    const options = ["To do", "Doing", "Done"]
                    const indexA = options.indexOf(a.status)
                    const indexB = options.indexOf(b.status)
                    comparison = indexA - indexB
                }
                if (sortBy === "createdAt") {
                    const dateA = new Date(a.createdAt).getTime()
                    const dateB = new Date(b.createdAt).getTime()
                    comparison = dateA - dateB
                }
                return comparison * sortOrder
            })
    }, [tasks, sortBy, sortOrder, query])

    const [selectedTaskIds, setSelectedTaskIds] = useState([])
    function toggleSelection(taskId) {
        if (selectedTaskIds.includes(taskId)) {
            setSelectedTaskIds(prev => prev.filter(id => id !== taskId))
        } else {
            setSelectedTaskIds(prev => [...prev, taskId])
        }
    }

    async function handleDeleteSelected() {
        try {
            await removeMultipleTasks(selectedTaskIds)
            alert(selectedTaskIds.length === 1 ? "Task eliminata con successo" : `Tasks ${selectedTaskIds.join(", ")} eliminate con successo`)
            setSelectedTaskIds([])
        } catch (err) {
            console.error(err)
            alert(err.message)
        }
    }



    return (
        <section className="mt-4">
            <h1 className="text-4xl text-center mb-5">Lista dei Task</h1>
            <div className="container flex flex-col justify-center items-center">
                <input
                    className="rounded-lg shadow-md py-1 px-2"
                    type="text"
                    placeholder="Cerca..."
                    onChange={e => debouncedSetQuery(e.target.value)} />
                <table className="rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="p-3"></th>
                            <th
                                className="p-3 text-left"
                                onClick={() => handleSort("title")}
                            >
                                Nome {sortBy === "title" && sortIcon}
                            </th>
                            <th
                                className="p-3 text-left"
                                onClick={() => handleSort("status")}
                            >
                                Stato {sortBy === "status" && sortIcon}
                            </th>
                            <th
                                className="p-3 text-left"
                                onClick={() => handleSort("createdAt")}
                            >
                                Data di creazione {sortBy === "createdAt" && sortIcon}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && filteredAndSortedTask.map((t, i) => (
                            <TaskRow
                                key={i}
                                id={t.id}
                                title={t.title}
                                status={t.status}
                                createdAt={t.createdAt}
                                checked={selectedTaskIds.includes(t.id)}
                                onToggle={toggleSelection}
                            />
                        ))}
                    </tbody>
                </table>
                {selectedTaskIds.length > 0 && (
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer mt-6"
                        onClick={handleDeleteSelected}
                    >
                        Elimina Selezionate
                    </button>
                )}
            </div>
        </section>
    )
}

export default TaskList