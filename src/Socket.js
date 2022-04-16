export default class Socket
{
    instance;
    constructor()
    {
        if(this.instance != null && this.instance != undefined)
            return this.instance;

        // Create WebSocket connection to WebSocket Server.
        //this.socket = new WebSocket('ws://localhost:3004');  //   Machine
        //this.socket = new WebSocket('ws://192.168.0.13:3004'); //   Home
        this.socket = new WebSocket('ws://10.16.211.2:3004');//   WSU
        
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