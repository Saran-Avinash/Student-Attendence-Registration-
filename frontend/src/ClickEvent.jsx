const ClickEvent = () => {

    function clickMe(name){
        console.log(`Hi ${name}`);
    }
    return ( 
        <div>
            <button onClick={() => clickMe('saran')}>Click here</button>
        </div>
     );
}
 
export default ClickEvent;