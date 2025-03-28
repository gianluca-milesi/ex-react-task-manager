import { memo } from "react"


function TaskRow({ title = "", status = "", createdAt = "" }) {

    const statusColors = {
        "To do": "red",
        "Doing": "yellow",
        "Done": "green"
    }


    return (
        <tr>
            <td>{title}</td>
            <td style={{ backgroundColor: statusColors[status] }}>{status}</td>
            <td>{createdAt}</td>
        </tr>
    )
}

export default memo(TaskRow)