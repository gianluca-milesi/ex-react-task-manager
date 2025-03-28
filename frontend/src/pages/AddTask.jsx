import { useNavigate } from "react-router-dom"
import { useState, useRef, useMemo, useContext } from "react"
import GlobalContext from "../contexts/GlobalContext"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"


function AddTask() {

    const { addTask } = useContext(GlobalContext)
    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const descriptionRef = useRef()
    const statusRef = useRef()

    const validateTitle = useMemo(() => {
        if (!title) {
            return "Il campo non può essere vuoto"
        }
        if ([...title].some(char => symbols.includes(char))) {
            return "Non può contenere simboli"
        }
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if (validateTitle) {
            return alert("Inserire i dati correttamente")
        } else {
            const newTask = {
                title: title.trim(),
                description: descriptionRef.current.value,
                status: statusRef.current.value
            }

            try {
                await addTask(newTask)
                alert("Task creata con successo")

                setTitle("")
                descriptionRef.current.value = ""
                statusRef.current.value = ""
            } catch (err) {
                console.error(err)
                alert(err.message)
            }
            navigate("/")
        }
    }


    return (
        <section className="mt-4">
            <h1 className="text-4xl text-center mb-5">Aggiungi una Task</h1>
            <div className="container flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col w-75 gap-2 rounded-lg shadow-md py-3 px-5">
                    <div className="flex flex-col">
                        <label htmlFor="title">Nome task</label>
                        <input type="text"
                            name="title"
                            id="title"
                            className="p-2 shadow-md"
                            placeholder="Inserisci nome..."
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                        {validateTitle && <span style={{ color: "red" }}>{validateTitle}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="description">Descrizione</label>
                        <textarea
                            name="description"
                            id="description"
                            className="p-2 shadow-md"
                            placeholder="Inserisci una descrizione..."
                            ref={descriptionRef}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label htmlFor="status">Stato</label>
                        <select className="p-1" ref={statusRef}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button className="self-center bg-sky-600 text-white py-1 px-3 rounded" type="submit">Invio</button>
                </form>
            </div>
        </section>
    )
}

export default AddTask