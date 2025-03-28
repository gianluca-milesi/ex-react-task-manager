import { memo } from "react"


function TaskRow({ title = "", status = "", createdAt = "" }) {

    const statusColors = {
        "To do": "bg-red-500 text-white",
        "Doing": "bg-yellow-500 text-black",
        "Done": "bg-green-500 text-white"
    }


    return (
        <tr>
            <td className="p-3">{title}</td>
            <td className={`p-3 text-center ${statusColors[status]}`}>{status}</td>
            <td className="p-3">{createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)