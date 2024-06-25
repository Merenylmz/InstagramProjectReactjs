import { BrowserRouter, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import Home from './Pages/Home';
import MainLayout from './Layouts/MainLayout';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import { useSelector } from 'react-redux';
import Chats from './Pages/Messages/Chats';
import Reels from './Pages/Reels/Reels';
import ProfileDetails from './Pages/Profile/ProfileDetails';
import Create from './Pages/Create';
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import NewPassword from "./Pages/Auth/NewPassword";

function App() {

  const auth = useSelector(state=>state.auth);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {
            !auth.isAuth ? <><Route path='/' element={<Login/>}/>
            <Route path='/register' element={<Register/>} />
            <Route path="/forgotpassword" element= {<ForgotPassword/>}/>
            <Route path="/newpassword/:token" element= {<NewPassword/>}/>
            </>:
            <>
              <Route path='/chats' element={<Chats/>}/>
              <Route exact element={<MainLayout/>}>
                <Route path='/home' element={<Home/>} />
                <Route path='/posts'>
                  <Route index element={<Home/>} />
                </Route>
                <Route path='/reels'>
                  <Route index element={<Reels/>}/>
                </Route>
                <Route path='/profile'>
                  <Route path=':id' element={<ProfileDetails/>}/>
                </Route>
                <Route path='/create' element={<Create/>}></Route>
              </Route>
            </>
          }
          
          <Route path='*' element={<div style={{color: "gray"}}>
            <p>Sayfaya erişim yok Geri dönmek için linke basınız</p>
            <NavLink to={auth.isAuth ? "/home" : "/"}>Geri Dön</NavLink>
          </div>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
