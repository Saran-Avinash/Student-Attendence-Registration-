import { useEffect, useState } from "react";
import Absentees from "./Absentees";
// import tableExport from '../FileSaver.js-master/FileSaver';
import { TableExport  } from "tableexport";

const Table = () => {

    let i = 1;
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [isErrorFetchingData, setisErrorFetchingData] = useState(false);
    const [retry, setRetry] = useState(0);
    const [absentees, setAbsentees] = useState({});
    console.log(data);
    console.log(absentees);
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

    function checkEitherHalf(arr, target){
        return target.every(v => arr?.includes(v));
    }

    function toggleFirstHalf(rollNo, checked){
        setAbsentees(prevState => {
            if(checked){
                return {...prevState,
                [rollNo] : [...new Set([ ...(prevState[rollNo] || []), 1, 2, 3, 4])]
                }
            }
            else{
                return {...prevState,
                [rollNo] : prevState[rollNo].filter(period => period != 1 && period != 2 && period != 3 && period != 4)
                }
            }
        })
    }

    function toggleSecondHalf(rollNo, checked){
        setAbsentees(prevState => {
            if(checked){
                return {
                    ...prevState,
                    [rollNo] : [...new Set([ ...(prevState[rollNo] || []), 5, 6, 7, 8])]
                }
            }
            else{
                return {
                    ...prevState,
                    [rollNo] : prevState[rollNo].filter(period => period != 5 && period != 6 && period != 7 && period != 8)
                }
            }
        })
    }
    function toggleAll(rollNo, checked){
        setAbsentees(prevState => {
            if(checked){
                return {...prevState, 
                [rollNo] : [1, 2, 3, 4, 5, 6, 7, 8]
                }
            }
            else{
                return {
                    ...prevState,
                    [rollNo] : []
                }
            }
        })
        console.log(absentees);
    }
    function markAbsentees(rollNo, period){
        
        setAbsentees(prevState => {
            if(prevState[rollNo]){
                if(prevState[rollNo].includes(period)){
                    return {...prevState, [rollNo] : prevState[rollNo].filter(p => p != period)};
                }
                else{
                    return {...prevState, [rollNo] : [...prevState[rollNo], period]}
                }
            }
            else{
                return {
                    ...prevState, [rollNo]: [period]
                }
            }
        })
        
        console.log(absentees);
    }

    function exportFile(){
        new TableExport(document.getElementsByTagName("table"));
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
                        <th >S.No</th>
                        <th>Section</th>
                        <th >Roll No</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                        <th>Click to mark absent <br></br> for entire day</th>
                        <th>Click to mark absent <br></br> for first half</th>
                        <th>Click to mark absent <br></br> for second half</th>
                    </tr>
                    
                    
                </thead>
                <tbody>
                    
                    {data.map((student) =>{
                        return (
                          
                            <tr key={student.roll_no} > 
                                <td>{i++}</td>
                                <td>C</td>
                                <td>{student.roll_no}</td>
                                 <td>
                                    <input id={1}
                                    checked= {absentees[student.roll_no]?.includes(1) || false}
                                    type="checkbox" onChange={()=> {
                                        markAbsentees(student.roll_no, 1);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={2}
                                    checked= {absentees[student.roll_no]?.includes(2) || false}
                                     type="checkbox" onChange={()=> {
                                        markAbsentees(student.roll_no, 2);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={3} type="checkbox" 
                                    checked= {absentees[student.roll_no]?.includes(3) || false}
                                    onChange={()=> {
                                        markAbsentees(student.roll_no, 3);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={4} type="checkbox"
                                    checked= {absentees[student.roll_no]?.includes(4) || false}
                                    onChange={()=> {
                                        markAbsentees(student.roll_no, 4);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={5} type="checkbox" 
                                    checked= {absentees[student.roll_no]?.includes(5) || false}
                                    onChange={()=> {
                                        markAbsentees(student.roll_no, 5);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={6} type="checkbox"
                                    checked= {absentees[student.roll_no]?.includes(6) || false}
                                    onChange={()=> {
                                        markAbsentees(student.roll_no, 6);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={7} type="checkbox" 
                                    checked= {absentees[student.roll_no]?.includes(7) || false}
                                    onChange={()=> {
                                        markAbsentees(student.roll_no, 7);
                                    }}/>
                                </td>
                                 <td>
                                    <input id={8}
                                    checked= {absentees[student.roll_no]?.includes(8) || false}
                                    type="checkbox" onChange={()=> {
                                        markAbsentees(student.roll_no, 8);
                                    }}/>
                                </td>

                                <td>
                                    <input id={9} type="checkbox" 
                                    checked = {absentees[student.roll_no]?.length === 8 || false}
                                    onChange={(e)=> {
                                        toggleAll(student.roll_no, e.target.checked);
                                    }}
                                    
                                    />
                                </td>
                                <td>
                                    <input 
                                    checked = {checkEitherHalf(absentees[student.roll_no], [1, 2, 3, 4]) || false}
                                    onChange={(e)=> {
                                        toggleFirstHalf(student.roll_no, e.target.checked);
                                    }}
                                    type="checkbox" id={10} />
                                </td>
                                <td>
                                    <input 
                                    checked = {checkEitherHalf(absentees[student.roll_no], [5, 6, 7, 8]) || false}
                                    onChange={(e)=> {
                                        toggleSecondHalf(student.roll_no, e.target.checked);
                                    }}
                                    type="checkbox" id={10} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                </table> 


         </div>}
         <button onClick={exportFile}>Click to Export</button>
         {data && <Absentees absenteesDetails={absentees}/>}
        </>
     );
}
 
export default Table;