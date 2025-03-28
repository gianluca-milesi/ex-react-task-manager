//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"
//Components
import TaskRow from "../components/TaskRow.jsx"


function TaskList() {

    const { tasks } = useContext(GlobalContext)


    return (
        <section className="mt-4">
            <h1 className="text-4xl text-center mb-5">Lista dei Task</h1>
            <div className="container flex flex-col justify-center items-center">
                <table className="rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="p-3 text-left">Nome</th>
                            <th className="p-3 text-left">Stato</th>
                            <th className="p-3 text-left">Data di creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks && tasks.map((t, i) => (
                            <TaskRow
                                key={i}
                                id={t.id}
                                title={t.title}
                                status={t.status}
                                createdAt={t.createdAt} />
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default TaskList