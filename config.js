var express = require("express")
// var mysql = require("mysql")
var mysql = require("mysql2")
var app = express()
app.use(express.json())

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root000',
  database:'db_auth'
})

//check if database conneciton is succeed
connection.connect((err)=>{
  if(err){
    console.log(err)
     
  }else{
    console.log("Database is connected")
  }
})

//Static files (img, css or js)
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'))


//get 
app.get('',(req,res)=>{
  res.sendFile(__dirname + '/view/signin.html')

})
// //get 
// app.get('',(req,res)=>{
//   res.sendFile(__dirname + '/view/index.html')

// })

module.exports = {
  connection
 }


 // // setup port and server
// const PORT = 3000;
// app.listen(PORT, (error) => {
//   if(error){
//     console.log('Error listening port 3000')
//   }else{
//     console.log("server is running on port: " + PORT);
//   }

// });