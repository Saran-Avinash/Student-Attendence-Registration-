import { useState } from "react";

const Absentees = (absentees) => {

    const [date, setDate] = useState(null);
    const [isError, setIsError] = useState(false);

    //update Date event handler
    function updateDate(event){
        const markedDate = event.target.value;
        setDate(markedDate);
        setIsError(false);
    }


    //mark absent event handler
    function markAbsent(){
    
        const payload = {
            absentees : absentees.absenteesDetails,
            date : date
        }
       console.log(absentees);
        fetch("http://localhost:8080/put", {
            'method' : 'POST',
            'mode' : "cors",
            'headers' : {
                'Content-Type' : 'application/json'
            },
            'body' : JSON.stringify(payload)
        }).then(response => {
            if(!response.ok){
                setIsError(true);
            }
            else{
                setIsError(false);
            }
        })
        
    }
    return ( 
       <>
         {isError && <div className="error-panel">
              <h3 className="error-message" style={{
                textAlign: "center"
              }}>
                 Error Submitting data to the database, check if you have duplicated the date!
              </h3>
            </div>}
         <div className="absentees-container">
             <div className="mark">
                <label htmlFor="date" className="lable">Select the date to mark absent for: </label>
                 <input type="date" name="" id="date" onChange={updateDate}/>
              </div>
          <div className="buttons">
             <button title={`Click to mark absent for the date ${date}`} onClick={markAbsent}>Submit</button>
            <a href="/getAttendence">Next Page -></a>
          </div> 
         </div>
       </> 
     );
}
 
export default Absentees;