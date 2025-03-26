//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"


function TaskList() {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)


    return (
        <>
            <h1>Lista dei Task</h1>
            {tasks && tasks.map(t => (
                <div key={t.id}>{t.title}</div>
            ))}
        </>
    )
}

export default TaskList