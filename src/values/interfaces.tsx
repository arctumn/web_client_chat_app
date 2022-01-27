

export interface user {
    name: string,
    color_name: string,
}

export interface message {
    user: user,
    msg: string
}

export interface client_conn {
    client: WebSocket
    message: message
}

export const SERVER_CONN = "ws:/localhost:5050"

export const NO_USER = {
    name:"NO_USER",
    color_name:"#FF0000"
}
