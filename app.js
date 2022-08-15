const express = require('express');

const app =express();
const port = 80;

app.use("/static",express.static("static"));


app.get("/",(req,res)=>{
    res.sendFile(__dirname+'/static/index.html');
})
app.get("/form",(req,res)=>{
    res.sendFile(__dirname+'/form.html');
})

app.listen(port,()=>{
    console.log("The server is listening");
})