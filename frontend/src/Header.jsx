import styles from './Header.module.css'
import { useState } from 'react';
function Header (){

    const [name, setName] = useState('Kongu Engineering College');


    function changeStates(){
        setName('New Engineerin College');
    }

    return (
        <header className={styles.header}>
            {/* <div className={styles.logo}>
                <img src={logo}  alt="" />
                <h2>{name}</h2>
            </div>  */}
            <div className="title">
                <h1>Attendence Report</h1>
            </div>
            
            <h3><i>II CSE - C</i></h3>
            
            
        </header>
    );
}

export default Header