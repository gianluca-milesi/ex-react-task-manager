import { useParams } from "react-router-dom"
import GlobalContext from "../contexts/GlobalContext"
import { useContext } from "react"


function TaskDetail() {

    const { id } = useParams()
    const { tasks, removeTask } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))

    const statusColors = {
        "To do": "text-red-500",
        "Doing": "text-yellow-500",
        "Done": "text-green-500"
    }


    return (
        <section className="mt-4">
            <h1 className="text-4xl text-center mb-5">Dettaglio Task</h1>
            <div className="container flex flex-col justify-center items-center">
                {task &&
                    <div className="flex flex-col gap-2 gap-2 rounded-lg shadow-md py-3 px-5">
                        <h3 className="text-xl font-bold text-center">{task.title}</h3>
                        <p><strong>Descrizione: </strong>{task.description}</p>
                        <p><strong>Stato: </strong><span className={`${statusColors[task.status]}`}>{task.status}</span></p>
                        <p><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
                        <button
                            className="self-center cursor-pointer bg-red-500 py-1 px-3 rounded"
                            onClick={removeTask}>Elimina</button>
                    </div>
                }
            </div>
        </section>
    )
}

export default TaskDetail