import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"


import Header from './Header.jsx';
import Table  from './table.jsx';
import Hero from './hero.jsx';
import Layout from "./Layouts/Layout.jsx";
import GetAttendence from "./GetAttendence.jsx";

function App() {
 
  const router = createBrowserRouter([
   {
     element: <Layout/>,
     children : [
      {
        path: "/",
        element: <Table/>
      },
      {
        path: "/getAttendence",
        element: <GetAttendence/>
      },
     ],
   },
  ])
  return(
    <RouterProvider router={router}/>
    // <>
    //  <Header/>
    //  <Hero/>
    //  {/* <Developer/> */}
    //  <Table/>
    // </>
   
  );

}

export default App
