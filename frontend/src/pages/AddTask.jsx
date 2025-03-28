import { useState, useRef } from "react"

const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~"


function AddTask() {

    const [title, setTitle] = useState("")
    const descriptionRef = useRef()
    const statusRef = useRef()

    function addTask(e) {
        e.preventDefault()

        const description = descriptionRef.current.value
        const status = statusRef.current.value

        if (!title) {
            alert("Inserisci un nome")
            return
        }
        if (title.split("").some(char => symbols.includes(char))) {
            alert("Non puoi inserire simboli")
            return
        }

        console.log("Dati inviati:", {
            title,
            description,
            status
        })
    }


    return (
        <section>
            <h1>Aggiungi una Task</h1>
            <div className="container">
                <form onSubmit={addTask}>
                    <div className="form-control">
                        <label htmlFor="title">Nome task</label>
                        <input type="text"
                            name="title"
                            id="title"
                            placeholder="Inserisci nome..."
                            value={title}
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Descrizione</label>
                        <input type="text"
                            name="description"
                            id="description"
                            placeholder="Inserisci una descrizione..."
                            ref={descriptionRef}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="status">Stato</label>
                        <select ref={statusRef}>
                            <option value="To do">To do</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <button type="submit">Invio</button>
                </form>
            </div>
        </section>
    )
}

export default AddTask