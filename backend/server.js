const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./model/attendence.js');

app.use(cors());
app.use(express.json());
// app.use('/', studentRouter);

app.get('/',  (req, res)=>{
    console.log(db);
    db.query('SELECT * FROM student', (err, result)=>{
        if(err){
            console.log(err);
            return res.sendStatus(500).send("Database query error"); 
        }
        
            res.send(result);

            // code to create attendence table initially
            // result.map(async student => {
            //     const rollNo = student.roll_no;
            //     const query2 = `INSERT INTO ATTENDENCE (roll_no) VALUES (\"${rollNo}\")`;
            //     console.log(query2);
            //      await db.query(query2, (err, result) => {
            //         if(err){
            //             console.log(err);
            //             return;
            //         }
                  
            //      })
            // })

        
    })
}) ;

app.post('/put', async (req, res)=> {
     console.log(req.body);
     const columnName = req.body.date
     try{
     const query = `alter table attendence add column \`${columnName}\` varchar(10)`;
     const rows = await db.query(query);
     }
     catch(error){
        if(error){
            res.sendStatus(404);
        }
        else{
            res.sendStatus(200);
        }
    }

     // Mark present for all students
    updateAttendenceStatus(req.body, req, res);

     
})


// app.use('/student', studentRouter);


app.post('/getAttendence', async (req, res)=> {
    console.log(req.body);
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    let availabeColumns = [];
    //query available columns in databse
    const query1 = 'Show columns from attendence';
    const rows = await db.query(query1);

    for(let  i = 0; i < rows.length; i++){
        availabeColumns[i] = rows[i].Field;
    }
    console.log(availabeColumns);

    // construct query dynamically to get reports for given date range
    try{
        const filteredColumns = availabeColumns.filter(column => column >= startDate && column <= endDate);
        console.log(filteredColumns);
        const query = `SELECT SNO, roll_no, ${filteredColumns.map((column)=> {return `\`${column}\``}).join(', ')} from attendence`;
        await db.query(query, (error, result) => {
            if(error){
            console.log(error);
            res.sendStatus(404);
            }
            else{
                // console.log(result);
                const payload = {
                    result : result,
                    filteredColumns : filteredColumns
                }
                console.log(payload);
                res.send(JSON.stringify(payload));
                return;
            }
        })
    }
    catch(error){
        if(error){
            res.sendStatus(404);
        }
        else{
            res.sendStatus(200);
        }
    }

})



async function updateAttendenceStatus(student){
    const date = student.date;
    const absenteesList = student.absentees;
    let status = "Present";

   
    const query = `UPDATE ATTENDENCE SET \`${date}\` = \"Present\"`;
    const row1 = await db.query(query);


    // mark absent for those whose roll number appears in the list
   for(let i = 0; i < absenteesList.length; i++){
        let rollNo = absenteesList[i];
        const query2 = `UPDATE ATTENDENCE SET \`${date}\` = \"Absent\" WHERE roll_no = ?`;
       const row2 =  await db.query(query2, [rollNo]);
   }


}

app.listen(8080, ()=> {
    console.log("Server created on port 8080");
})
 