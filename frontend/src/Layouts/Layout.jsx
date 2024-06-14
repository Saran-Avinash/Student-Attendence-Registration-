import { Outlet } from "react-router-dom";
import Header from "../Header";
import Hero from "../hero";



function Layout(){
    return(
        <>
            <Header/>
            <Hero/>
                <Outlet/>
        </>
    );
}


export default Layout;