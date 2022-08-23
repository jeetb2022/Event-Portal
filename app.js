const express = require('express');

const app =express();
const port = 80;

app.use("/static",express.static("static"));

app.use(express.urlencoded());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/static/index.html');
})
app.get("/form",(req,res)=>{
    res.sendFile(__dirname+'/static/form.html');
})

app.post("/",(req,res)=>{
    let Name = req.body;
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.roll);
})

app.listen(port,()=>{
    console.log("The server is listening");
})