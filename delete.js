const http = require('http');
const server = http.createServer((req, res) => {
    console.log("Someone pinged us. ");
})
server.listen(3000, ()=>{
    console.log("Server is live on port 3000");
})