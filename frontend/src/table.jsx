import { useEffect, useState } from "react";
import Absentees from "./Absentees";

const Table = () => {

    let i = 1;
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isErrorFetchingData, setisErrorFetchingData] = useState(false);
    const [retry, setRetry] = useState(0);
    const [absentees, setAbsentees] = useState([]);
    console.log(data);
    useEffect(() => {
    fetch('http://localhost:8080').then(response => {
        return response.json();
    }).then(d => {
        console.log(d);
        setData(d);
        setIsPending(false);
        setisErrorFetchingData(false);
        
    }).catch(err => {
        setisErrorFetchingData(true);
        setIsPending(false);
    })
}, [retry]);


    function tryAgain(){
        setIsPending(true); 
        setisErrorFetchingData(false);
        setRetry(prev => prev + 1);
    }

    function markAbsentees(rollNo){
        setAbsentees(prevState => {
            if(prevState.includes(rollNo)){
                return prevState.filter(id => id != rollNo);
            
            }
            else{
                return [...prevState, rollNo];
            }
        });
        
        console.log(absentees);
    }

        return ( 
        <>
        {/* {absentees && <div>Absentees: {absentees}</div>} */}
        {isErrorFetchingData && <div className="error-panel">
           <h3 className="error-message">Error Fetching Data from DB! </h3>
           <button className="ok" onClick={tryAgain}>Try Again!</button>
           </div>
        }
       {isPending && <div style={{
          textAlign: 'center'
       }}> Loading </div>}
       {data &&
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Roll No</th>
                        <th>Section</th>
                        <th>Select To Mark Absent</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {data.map((student) =>{
                        return (
                          
                            <tr key={student.roll_no} > 
                                <td>{i++}</td>
                                <td>{student.roll_no}</td>
                                <td>{student.section}</td>
                                 <td>
                                    <input id={student.roll_no} type="checkbox" onChange={()=> {
                                        markAbsentees(student.roll_no);
                                    }}/>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table> 
         </div>}
         {data && <Absentees absenteesDetails={absentees}/>}
        </>
     );
}
 
export default Table;