var express = require("express")
var mysql = require("mysql")
const connect = require("./config")
var app = express()
app.use(express.json())

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root000',
  database:'db_auth'
})

//check if database conneciton is succeed
connection.connect((error)=>{
  if(error){
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }else{
    console.log("Database is connected")
  }
})


//POST: Insert new user record
app.post('/account',(req,res)=>{
  const newAccount = req.body;
  let sql = `INSERT INTO tbl_auth_reg (username, password) VALUES('${newAccount.username}', '${newAccount.password}')`;
  connection.query(sql,(error,result)=>{
    if(error){
      return res.status(500).json({
        error: true,
        message: error.message
      })
    }
    res.status(201).json({
          error: error,
          message: 'new record added successfully', 
          data: result
    })
  })
})

//Check if  username is exsit
app.post('/signin',(req,res)=>{
const user = req.body;
const query_check_username = "select username from tbl_auth_reg"
connection.query(query_check_username,(error,result)=>{
  if(error){
    return res.status(500).json({
      error: true,
      message: error.message
    })
  }
  console.log(user.username)
  console.log(result);
  // if(result === username.username){
  //   console.log(result)
  // }else{
  //   // console.log("insert username")
  //   console.log(`${username.username}`);
  //   console.log(result)
  // }
})

})

// //get employee by specific username
// /*First 1. You need to Get the data from form of input field
//   Second 2. Check if data exist and if data is not identical*/
// app.get('employees/:username',(req,res)=>{
//   //request with parameter of the user id
//   let username = req.params.username;
//   //create query to select the id
//   let sql = `SELECT username FROM tbl_auth_reg`;
//   db.connection.query(sql,(error,result)=>{
//     if(error){
//       return res.status(500).json({
//         error: true,
//         message: error.message
//       })
//     }

//     //CHECK if username exist and match (condition: no same username is allowed)
// const name = req.body.name;
// // const id = req.body.id;
// const query_check_name = `select username from tbl_auth_reg where username`
// connection.query(query_check_name,(error,result)=>{
//   if(error){
//     console.log(error)
//   }
//   if(result == name){
//     console.log(`username exist ${name} `)
//   }
//   res.status(200).json({
//     error:false,
//     data:result
//   })
// })

//     //Check if match
//     if(result !== `${username}`){
//       const insert_username = connection
//         //stop execution and return from this block only if only there is error
//       //if condition true then it will go to next bloack
//       return res.status(404).json({
//         erorr: true,
//         message: 'no employee found with id:' + username
//       })
//     }
//     res.status(200).json({
//       error:false,
//       data:result
//     })
//   })
// })











//Insert data to table tbl_auth_reg
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

//initialize expres app
// setup port number and listen
const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
console.log(`server is running on port : ${ PORT }`)
})
