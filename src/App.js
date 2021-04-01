import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Home from './Component/Home/Home';
import Booking from './Component/Booking/Booking';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Component/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Nav from './Component/Nav/Nav';
import Admin from './Component/Nav/Admin/Admin';
import Order from './Component/Order/Order';


export const UserContext = createContext();
function App() {
  const [loggedIUser , setLoggedInUser] = useState({});
  return (
    <div style={{backgroundColor:'white'}}>

      
      <UserContext.Provider value={[loggedIUser , setLoggedInUser]}>
        
         
      

         <Router>
           <Nav></Nav>
           <Switch>
             <Route exact path="/home">
               <Home></Home>
             </Route>
             <PrivateRoute exact path="/order">
               <Order></Order>
             </PrivateRoute>
             <PrivateRoute path="/booking/:d">
                <Booking></Booking>
             </PrivateRoute>

             <Route exact path="/login">
               <Login></Login>
             </Route>
             <Route exact path="/admin">
               <Admin></Admin>
             </Route>
             <Route exact>
               <Home></Home>
             </Route>
           </Switch>
         </Router>
         </UserContext.Provider>
    </div>
  );
}

export default App;
