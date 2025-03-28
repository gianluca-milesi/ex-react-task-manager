import { useParams, useNavigate } from "react-router-dom"
import GlobalContext from "../contexts/GlobalContext"
import { useContext, useState } from "react"
import BackButton from "../components/BackButton.jsx"
import Modal from "../components/Modal.jsx"
import EditTaskModal from "../components/EditTaskModal.jsx"


function TaskDetail() {

    const { id } = useParams()
    const navigate = useNavigate()
    const { tasks, removeTask, updateTask } = useContext(GlobalContext)

    const task = tasks.find(t => t.id === parseInt(id))
    const statusColors = {
        "To do": "text-red-500",
        "Doing": "text-yellow-500",
        "Done": "text-green-500"
    }

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)

    async function handleDelete() {
        try {
            await removeTask(task.id)
            alert("Task rimossa con successo")

            navigate("/")
        } catch (err) {
            console.error(err)
            alert(err.message)
        }
    }

    async function handleUpdate(updatedTask) {
        try {
            await updateTask(updatedTask)
            setShowEditModal(false)
        } catch (err) {
            console.error(err)
            alert(err.message)
        }
    }

    if (!task) {
        return <div>Task non trovato.</div>
    }


    return (
        <>
            <section className="mt-4">
                <BackButton />
                <h1 className="text-4xl text-center mb-5">Dettaglio Task</h1>
                <div className="container flex flex-col justify-center items-center">
                    {task &&
                        <div className="flex flex-col gap-2 gap-2 rounded-lg shadow-md py-3 px-5">
                            <h3 className="text-xl font-bold text-center">{task.title}</h3>
                            <p><strong>Descrizione: </strong>{task.description}</p>
                            <p><strong>Stato: </strong><span className={`${statusColors[task.status]}`}>{task.status}</span></p>
                            <p><strong>Data di creazione: </strong>{new Date(task.createdAt).toLocaleDateString()}</p>
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Elimina
                                </button>
                                <button
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer"
                                    onClick={() => setShowEditModal(true)}
                                >
                                    Modifica
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </section>

            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questa task?"
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                confirmText="Conferma"
            />

            <EditTaskModal
                task={task}
                show={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdate}
            />
        </>

    )
}

export default TaskDetail