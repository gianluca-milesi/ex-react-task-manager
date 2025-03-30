import { Link } from "react-router-dom"
import { memo } from "react"
import dayjs from "dayjs"


function TaskRow({ id = new Date(), title = "", status = "", createdAt = "", checked, onToggle }) {

    const statusColors = {
        "To do": "bg-red-500 text-white",
        "Doing": "bg-yellow-500 text-black",
        "Done": "bg-green-500 text-white"
    }


    return (

        <tr>
            <td className="p-3">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(id)}
                />
            </td>
            <td className="p-3">
                <Link to={`/task/${id}`}>
                    {title}
                </Link>
            </td>
            <td className={`p-3 text-center ${statusColors[status]}`}>{status}</td>
            <td className="p-3">{dayjs(createdAt).format("DD/MM/YYYY")}</td>
        </tr >
    )
}

export default memo(TaskRow)