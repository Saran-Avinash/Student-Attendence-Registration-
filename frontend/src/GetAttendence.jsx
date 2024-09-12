import { useEffect, useState } from "react";
import { TableExport } from "tableexport";

const GetAttendence = () => {
    
       const [fromDate, setFromDate] = useState(null);
       const [toDate, setToDate] = useState(null);
       const [details, setDetails] = useState(null);
       const [isPending, setIsPending] = useState(false);
       const [isError, setIsError] = useState(false);
       const [filteredColumns, setFilteredColumns] = useState([]);
       const periodNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
       let date = new Date();
       let j = 0;
       let totalPeriods = 0;
       let candidatePeriodAttendance = 0;
 
       function exportFile(){
        // new TableExport(document.getElementsByTagName("table"));
        let table = document.getElementsByTagName("table");
        TableToExcel.convert(table[0], {
            name : `${(new Date()).getTime()}-cse-c.xlsx`,
            sheet : {
                name : 'Sheet 1'
            }
        
    
        });
    }
       async function  fetchDetails(){

        const payLoad = {
            startDate : fromDate,
            endDate : toDate
        }

        fetch("http://localhost:8080/getAttendance", {
            'method' : 'POST',
            'headers' : {
                'Content-Type' : 'application/json',
            },
            'body' : JSON.stringify(payLoad)
        }).then(
           async  response => {
                
                try{
                  if(!response.ok){
                    setIsError(true);
                    setIsPending(false);
                  }
                  const result = await response.json();
                //   console.log(result);
                  return result;
                }
                catch(error){
                    setIsError(true);
                    console.log(error);
                }
            }
        ).then(result => {

            console.log(result);
            // console.log(filteredColumns);
            setIsError(false);
            setDetails(result);
            setIsPending(false);
            // setFilteredColumns(result.filteredColumns);
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
                                <th rowSpan={2}>S.No</th>
                                <th rowSpan={2}>Roll No</th>
                                {[...new Set(Object.values(details).flatMap(dates => Object.keys(dates)))].map(date =>{
                                    const dateObj = new Date(date);
                                    const formattedDate = dateObj.toLocaleDateString("en-IN");
                                    return (

                                    <th key={`${formattedDate}`}colSpan={8}>{formattedDate}</th>
                                );})
                            }
                             <th rowSpan={2}>Total Periods</th> 
                             <th rowSpan={2}>Attended Periods</th>
                             <th rowSpan={2}>Period vise <br></br> Attendance Percentage</th>
                            </tr>
                            <tr>
                                {
                                    [...new Set(Object.values(details).flatMap(dates => Object.keys(dates)))].map(date => {
                                       return(
                                        periodNumbers.map(period => {
                                            console.log(period);
                                            return(<th key={`${date}-${period}`}>{period}</th>);
                                        
                                        })
                                       );
                                        // return res
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(details).map(([rollno, dates]) => {
                                totalPeriods = 0;
                                candidatePeriodAttendance = 0;
                                return(
                                    <tr key={`${rollno}-j`}>
                                    <td>{++j}</td>
                                    <td>{rollno}</td>
                                    {Object.entries(dates).map(([date, periods]) => {
                                      return (
                                        <>
                                            {Object.entries(periods).map(([period, status]) => {
                                                totalPeriods++;
                                                status == "P" ? candidatePeriodAttendance++ : '';
                                                return(
                                                    <>
                                                        {/* <td key={`${rollno}-${period}`}>{period}</td> */}
                                                        
                                                        <td className={status == "A" ? `red-text` : ''} key={`${rollno}-${period}-${status}`}>{status}</td>
                                                    </>
                                                )
                                            }) }
                                        </>
                                      )
                                    })}
                                    <td>{totalPeriods}</td>
                                    <td>{candidatePeriodAttendance}</td> 
                                    <td>{((candidatePeriodAttendance / totalPeriods)*100).toFixed(2)}</td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                     {/* <table className="table">
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
                    </table>  */}
            </div>}
            <button onClick={exportFile}>Click to Export</button>
        </>
     );
}
 
export default GetAttendence;