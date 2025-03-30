import { useState, useRef, useMemo } from "react"
import Modal from "./Modal"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"


function EditTaskModal({ show, onClose, task = {}, onSave }) {

    const [editedTask, setEditedTask] = useState(task)
    const { title, description, status } = editedTask

    const editFormRef = useRef()

    function handleEditedTask(key, e) {
        setEditedTask(prev => ({ ...prev, [key]: e.target.value }))
    }

    const validateTitle = useMemo(() => {
        if (!title) {
            return "Il campo non può essere vuoto"
        }
        if ([...title].some(char => symbols.includes(char))) {
            return "Non può contenere simboli"
        }
    })

    function handleSubmit(e) {
        e.preventDefault()

        if (validateTitle) {
            return alert("Inserire i dati correttamente")
        }

        onSave(editedTask)
    }


    return (
        <Modal
            title="Modifica task"
            content={
                <form ref={editFormRef} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title">Nome task</label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => handleEditedTask("title", e)}
                        />
                        {validateTitle && <span style={{ color: "red" }}>{validateTitle}</span>}
                    </div>
                    <div>
                        <label htmlFor="description">Descrizione</label>
                        <textarea
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => handleEditedTask("description", e)}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Stato</label>
                        <select
                            name="status"
                            id="status"
                            value={status}
                            onChange={(e) => handleEditedTask("status", e)}
                        >
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                </form>
            }
            confirmText="Salva"
            show={show}
            onClose={onClose}
            onConfirm={() => editFormRef.current.requestSubmit()}
        />
    )
}

export default EditTaskModal