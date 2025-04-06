const mysql = require('mysql2');
const util = require('util');
 

const configuration = {
    host: "localhost",
    user: "root",
    password: "saran123@*",
    database: "attendence"
}

 

const connection = mysql.createConnection(configuration);
const query = util.promisify(connection.query).bind(connection);

connection.connect((err)=> {
  if(err){
    console.log("error connecting to db");
    console.log(err);
    return;
  }
  else{
    console.log("successfully connected to db");
  }
})
 

module.exports = {
  query
}