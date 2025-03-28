//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"
//Components
import TaskRow from "../components/TaskRow.jsx"


function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)


    return (
        <section>
            <h1>Lista dei Task</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map(t => (
                        <TaskRow key={t.id} title={t.title} status={t.status} createdAt={t.createdAt} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default TaskList