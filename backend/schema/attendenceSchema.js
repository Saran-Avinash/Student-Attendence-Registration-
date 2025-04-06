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


// insert into student (roll_no, class) values 
// ('22CSR125', 'C'),
// ('22CSR126', 'C'),
// ('22CSR127', 'C'),
// ('22CSR128', 'C'),
// ('22CSR129', 'C'),
// ('22CSR130', 'C'),
// ('22CSR131', 'C'),
// ('22CSR132', 'C'),
// ('22CSR134', 'C'),
// ('22CSR135', 'C'),
// ('22CSR136', 'C'),
// ('22CSR137', 'C'),
// ('22CSR138', 'C'),
// ('22CSR139', 'C'),
// ('22CSR140', 'C'),
// ('22CSR141', 'C'),
// ('22CSR142', 'C'),
// ('22CSR143', 'C'),
// ('22CSR144', 'C'),
// ('22CSR145', 'C'),
// ('22CSR146', 'C'),
// ('22CSR147', 'C'),
// ('22CSR148', 'C'),
// ('22CSR149', 'C'),
// ('22CSR150', 'C'),
// ('22CSR151', 'C'),
// ('22CSR152', 'C'),
// ('22CSR153', 'C'),
// ('22CSR154', 'C'),
// ('22CSR155', 'C'),
// ('22CSR156', 'C'),
// ('22CSR157', 'C'),
// ('22CSR158', 'C'),
// ('22CSR159', 'C'),
// ('22CSR160', 'C'),
// ('22CSR161', 'C'),
// ('22CSR162', 'C'),
// ('22CSR163', 'C'),
// ('22CSR164', 'C'),
// ('22CSR165', 'C'),
// ('22CSR166', 'C'),
// ('22CSR167', 'C'),
// ('22CSR168', 'C'),
// ('22CSR169', 'C'),
// ('22CSR170', 'C'),
// ('22CSR171', 'C'),
// ('22CSR172', 'C'),
// ('22CSR173', 'C'),
// ('22CSR174', 'C'),
// ('22CSR175', 'C'),
// ('22CSR176', 'C'),
// ('22CSR177', 'C'),
// ('22CSR178', 'C'),
// ('22CSR179', 'C'),
// ('22CSR180', 'C'),('22CSR181', 'C'),
// ('22CSR182', 'C')