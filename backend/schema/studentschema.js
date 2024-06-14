/* student table with attributes
     roll no (integer) starts from 123 to 182 except 133, including 255, 257, 258, 260
     class (character) 

   attendence table whose column gets added every day
      roll no (foregin key) references student.rollNo
      attribute name (data ) value (character) `represents present or absent`


*/
const db = require('../model/attendence.js');
async function  insertIntoStudent() {

    
    
    let id = 5;
    const query = 'show columns from attendence';
    
 
        
         await db.query(query, (err, res)=> {
            if(err){
              console.log(res);
            }
            else{

              const col = res.map((obj) => {return obj.Field;}).filter(col => col >= '2024-06-12' && col <= '2024-06-12');
            console.log(col);
            }
          });
} 
insertIntoStudent();