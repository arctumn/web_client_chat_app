import { useEffect, useState } from "react"

import { client_conn, message, NO_USER, SERVER_CONN } from "../values/interfaces"

const send_message = (conn: client_conn) => {
    if (conn.client.readyState === conn.client.OPEN) {
        conn.client.send(JSON.stringify(conn.message))
    } else {
        alert("Error sending a message")
    }
}

const message_construct = (msg: message) => {

    return <div style={{
        display: "flex",
        flexDirection: "row",
        height: "5vh",
        borderWidth: "1em",
        flexWrap:"wrap",
        paddingLeft:"5px"
    }}>
        <p style={{
            color: msg.user.color_name,
            fontWeight: "bold",
            fontSize: "1.5em"
        }}>{msg.user.name + ": "}</p>
        <p style={
            {
                fontSize: "1.5em"
            }
        }>{msg.msg}</p>
    </div>
}
const client_con = new WebSocket(SERVER_CONN)

export const Main_UI = () => {


    const [msg, setMessage] = useState('')
    const [user, setUser] = useState(NO_USER)
    const [msgs, updateMessages] = useState([] as message[])
    useEffect(() => {
        client_con.onmessage = evt => {
            const inn_message = JSON.parse(evt.data.toString()) as message
            console.log(inn_message)

            updateMessages(() => {
                let messages = Array.from(msgs)
                messages.push(inn_message)
                return messages
            })
        }
    })


    return <div>
        <div
            style={{
                height: "5vh",
                backgroundColor: "grey",
                margin: "auto",
                display:"flex",
                justifyContent:"center"
            }}
        ><label style={{
                    fontWeight: "bold",
                    paddingTop: "10px"
                }
            }>Name:</label>
            <input style={{ margin: "10px"}} type="text" value={user.name} onChange={e => setUser({
                name: e.currentTarget.value,
                color_name: user.color_name
            })}></input>
            <label style={
                {
                    fontWeight: "bold",
                    paddingTop: "10px"
                }
            }>Color:</label>
            <input style={{
                margin: "10px"
            }} type="color" value={user.color_name} onChange={e => setUser({
                name: user.name,
                color_name: e.currentTarget.value
            })}></input>
        </div>
        <div style={{
            display: "flex",
            flexDirection: "column",
            height: "90vh",
            overflow: "hidden",
        }}>{msgs.map(message_construct)}
        </div>
        <div style={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            height: "5vh",
            margin:"auto",
            position: "fixed",
            flexWrap: "nowrap",
            overflow: "hidden",
            bottom:0,
        }}>
            <input style={{
                width: "90vw",
            }} type="text" onInput={e => setMessage(e.currentTarget.value)} value={msg} />
            <button style={
                {
                    width: "20vw",
                    marginRight: "0px",
                    overflow: "hidden"
                }
            } onClick={
                () => {
                    if (msg)
                        send_message(
                            {
                                client: client_con,
                                message: {
                                    user: user,
                                    msg: msg
                                }
                            }
                        ); setMessage("")
                }}>Submit</button>
        </div>
    </div>
}