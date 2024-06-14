import { useEffect, useState } from "react";

const GetAttendence = () => {
    
       const [fromDate, setFromDate] = useState(null);
       const [toDate, setToDate] = useState(null);
       const [details, setDetails] = useState(null);
       const [isPending, setIsPending] = useState(false);
       const [isError, setIsError] = useState(false);
       const [filteredColumns, setFilteredColumns] = useState([]);
       let i = filteredColumns.length;
       let j = 0;
 
       function fetchDetails(){

        const payLoad = {
            startDate : fromDate,
            endDate : toDate
        }

        fetch("http://localhost:8080/getAttendence", {
            'method' : 'POST',
            'headers' : {
                'Content-Type' : 'application/json',
            },
            'body' : JSON.stringify(payLoad)
        }).then(
            response => {
                
                try{
                  if(!response.ok){
                    setIsError(true);
                    setIsPending(false);
                  }
                  return response.json();
                }
                catch(error){
                    
                    console.log(error);
                }
            }
        ).then(result => {

            console.log(details);
            console.log(filteredColumns);
            setIsError(false);
            setDetails(result.result);
            setIsPending(false);
            setFilteredColumns(result.filteredColumns);
        })
       }
    

     

    return ( 
        <>
          <div className="inputs">
            <div className="container">
                <div className="range">
                    <label htmlFor="">From:</label>
                    <input type="date" name="" id="" onChange={(event)=>{
                        
                        setFromDate(event.target.value);
                    }} />

                    <label htmlFor="">To:</label>
                    <input type="date" name="" id="" onChange={(event)=>{
                        setToDate(event.target.value);
                    }}/>
                </div>
                <button onClick={() => {
                    fetchDetails();
                    setIsPending(true);
                    }}>Get Details</button>
            </div>
          </div>
          {isPending && <div style={{
            textAlign : "center"
          }}>
             Loading...
             </div>}
          {isError && <div className="error-panel">
            <h3 className="error-message">
              Error Loading date from DB!
             </h3></div>}
          {details && <div className="table-container">
                    
                    <table className="table">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Roll No</th>
                                {filteredColumns.map(column => {
                                    return (
                                         <th key={j++}>
                                            {column}
                                         </th>
                                    )
                                })}
                                <th>Total Days</th>
                                <th>Attendence Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                details.map((column)=> {
                                    let count = 0;
                                    return (
                                        <tr key={j++}>
                                            <td>{column.SNO}</td>
                                            <td>{column.roll_no}</td>
                                            {filteredColumns.map(date => {
                                                if(column[date] == 'Present'){
                                                    count++;
                                                }
                                                return (
                                                    <td key={i++}>
                                                        {column[date]}
                                                    </td>
                                                )
                                            })}
                                            <td>{filteredColumns.length}</td>
                                            <td>{((count / filteredColumns.length)*100).toFixed(2)}</td>
                                        </tr>

                                    )
                                })
                            }
                        </tbody>
                    </table>
            </div>}
        </>
     );
}
 
export default GetAttendence;