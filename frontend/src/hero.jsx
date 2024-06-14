import logo from './assets/logo.jpeg'


const Hero = () => {
    return ( 
        <>
            <div className="hero">
                <div className="log">
                    <img src={logo} alt="Kec logo" />
                </div>
                <div className="content">
                      <h1 className="college-name">Kongu Engineering College</h1>
                      <h4>Attendence Module for II CSE C</h4>
                 
                <p className='developer'>Designed and developed By <br />
                   <a href="">Parthasarathi S  </a><span>,</span>
                   <a href="">Pravin S </a> <span>,</span>
                   <a href="">Saran Avinash B</a>
                </p>
               </div>
                
            </div>
        </>
     );
}
 
export default Hero;