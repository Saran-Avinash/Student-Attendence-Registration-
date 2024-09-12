const db = require('../model/attendence.js');



exports.display = (req,res) => {
    
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
}

 
exports.recordAttendance = async (req, res) => {
        // console.log(req.body);
        const {absentees, date} = req.body; // absentees : rollno : [1, 2] periods
        markAbsent(absentees, date)
       //  try{
       //  const query = `alter table attendence add column \`${columnName}\` varchar(10)`;
       //  const rows = await db.query(query);
       //  }
       //  catch(error){
       //     if(error){
       //         res.sendStatus(404);
       //     }
       //     else{
       //         res.sendStatus(200);
       //     }
       // }
   
       //  // Mark present for all students
       // updateAttendenceStatus(req.body, req, res);
   
        
}


async function markAbsent (absentees, date){
    try{
        await db.query("START TRANSACTION");
        let presentees = [];
        
        for(let i = 0 ; i < 60; i++){
            if(i+123 != 133){
            presentees[i] = `22CSR${i + 123}`;
            }
        }
        presentees.push("22CSL255");
        presentees.push("22CSL257");
        presentees.push("22CSL258");
        presentees.push("22CSL260");
        presentees.push("20CSR014");
        
        //find presenteees
        const absenteesObject = Object.entries(absentees).map(entry => entry[0]);
        console.log(absenteesObject);

        presentees = presentees.filter(rollno => !absenteesObject.includes(rollno));
        console.log(presentees);
 
        for(let i = 0; i < presentees.length; i++){
          const attendanceResult =  await db.query('INSERT INTO ATTENDANCE (rollno, date) VALUES (?,?) ON DUPLICATE KEY UPDATE ID = LAST_INSERT_ID(id)', [presentees[i], date]);
          const attendenceId = attendanceResult.insertId;

          let periodNumber = 1;
          for( periodNumber = 1; periodNumber <= 8; periodNumber++){
              const status = "P";

              await db.query('INSERT into period_attendance (attendance_id, period_number, status) VALUES (?,?,?)', 
              [attendenceId, periodNumber,status]);
          }

        }

        for(const [rollNo, periods] of Object.entries(absentees)){
            
            const attendanceResult = await db.query(`INSERT INTO attendance (rollno, date)  VALUES (?, ?) ON DUPLICATE KEY UPDATE ID = LAST_INSERT_ID(id)`,
                                                    [rollNo, date]);
            // console.log(attendanceResult);
            const attendenceId = attendanceResult.insertId;


            //mark absent for period
            let periodNumber = 1;
            for( periodNumber = 1; periodNumber <= 8; periodNumber++){
                const status = periods.includes(periodNumber) ? "A" : "P";
                console.log(status);

                await db.query('INSERT into period_attendance (attendance_id, period_number, status) VALUES (?,?,?)', 
                [attendenceId, periodNumber,status]);
            }


            await db.query("COMMIT");
            console.log("Attendence is succesfully recorded for the date", date);
        }
        
    }
    catch(err){
        await db.query("ROLLBACK");
        console.log("Transaction rolled back due to error: ", err);
        return;
    }
}


exports.getAttendance = async (req,res) => {

try{
    const {startDate, endDate} = req.body;
    const results =  await db.query("select a.rollno, a.date, p.period_number, p.status from attendance a join period_attendance p on a.id = p.attendance_id where a.rollno between ? and ? and a.date between ? and ?", ["20CSR014", "22CSR182", startDate, endDate] );
    console.log(results);

    const requiredFormat = results.reduce((acc, result) => {
        const {rollno, date, period_number, status} = result;

        if(!acc[rollno]){
            acc[rollno] = {};
        }

        if(!acc[rollno][date]){
            acc[rollno][date] = {};
        }

        acc[rollno][date][period_number] = status;

        return acc;
    }, {});

    res.json(requiredFormat);
}
catch(err){
    console.log("Error fetching data from database", err);
    return;
}
    
}