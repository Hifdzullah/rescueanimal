var express = require("express")
var mysql = require("mysql")
var app = express()
app.use(express.json())

const con = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root000',
  database:'db_auth'
})

//check if database conneciton is succeed
con.connect((err)=>{
  if(err){
    console.log(err)
     
  }else{
    console.log("Database is connected")
  }
})

const username = req.body.username;
const password = req.body.password;
const query_check_userame = "select * from tbl_auth_reg where username = username"
con.query(sql,[username,password],(error,result)=>{

})



app.post('/post',(req,res)=>{
  // const user_id = req.body.user_id;
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  
  const sql = 'insert into tbl_auth_reg (username, password) values(?,?)'
  con.query(sql,[username,password],(error,result)=>{
    res.status(201).json({
          error: error,
          message: 'new record added successfully', 
          data: [{username,password}]
    })
  })
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

// setup port and server
const PORT = 3000;
app.listen(PORT, (error) => {
  if(error){
    console.log('Error listening port 3000')
  }else{
    console.log("server is running on port: " + PORT);
  }

});