const dbModel = require('../model/attendence.js');



async function addAttendence() {
   
    try{
        const db = await dbModel.connect();
        console.log("Connection to database successful");
        const query = 'ALTER TABLE attendence DROP COLUMN `01/01/23`';
        const date = 'givendate';
        await db.query(query, (err, result)=>{
            
            if(err){
                console.log(err);
                return;
            }
            console.log(result);
    
        })
    }
    catch(err){
        console.log(err);
    }

}

addAttendence();
