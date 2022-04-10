export default class Socket
{
    instance;
    constructor()
    {
        if(this.instance != null && this.instance != undefined)
            return this.instance;

        // Create WebSocket connection.
        this.socket = new WebSocket('ws://localhost:3004');

        //listener for when we receive a message
        this.socket.addEventListener('message', function (event) {
            console.log('Message from server ', event.data);
        });

        this.instance = this;
    }

    send(msg)
    {
        this.socket.send(msg)
    }
}