import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";
import "../Style/card.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const MainLayout = () => {
    const [profileMenu, setProfileMenu] = useState(false);
    const [searchPanel, setSearchPanel] = useState(false);
    const [searchedUser, setSearchedUser] = useState(null);
    const [allUsers, setAllUsers] = useState(null);
    const [notificationPanel, setNotificationPanel] = useState(false);
    // const [newNotification, setNewNotification] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state=>state.auth);

    useEffect(() => {
        getAllUsers();
    }, []);
    

    const getSearchedUserSubmit = async(e)=>{
        e.preventDefault();
        let searchTxt = e.target.searchtxt.value;
        const response = await axios.get(`http://localhost:8000/api/auth/search?searchtxt=${searchTxt}`);
        const data = response.data;
        setSearchedUser(data);
        console.log(searchTxt, data);
        return data;
    };

    const showHideSearchPanel = () =>{searchPanel ? setSearchPanel(false) : setSearchPanel(true);}

    const signOutOperation = () =>{
        dispatch({type: "LOGOUT"});

        setTimeout(() => {
            navigate("/");
        }, 50);
    };

    const getAllUsers = async() =>{
        try {
            const response = await axios.get("http://localhost:8000/api/auth/allusers");
            const users = response.data;

            setAllUsers(users);
        } catch (error) {
            console.log(error);
        }
    };

    // const readNotification = async(notificationId) =>{
    //     try {
    //         const response = await axios.get(`http://localhost:3000/auth/userdetails?userid=${auth.user._id}&notificationid=${notificationId}`);
    //         const user = response.data;

    //         setNewNotification(user);

    //         return user;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <div style={{display: "flex"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width: "260px", backgroundColor: "black", height: "100vh", borderRight: "1px solid gray", position: "fixed"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" >
                <svg className="bi me-2" width="40" height="32"></svg>
                <span className="fs-4">Instagram</span>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto" style={{fontSize: "17px"}}>
                <li className="nav-item">
                    <Link to="/home" className="nav-link text-white" aria-current="page">
                    <i className="bi bi-house-door-fill me-3"></i>
                    Anasayfa
                    </Link>
                </li>
                <button onClick={()=>console.log(auth.user)}>asdasdas</button>
                <li>
                    <button type="button" onClick={()=>showHideSearchPanel()} className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                        Ara
                    </button>
                </li>
                <li>
                    <Link to="/posts" className="nav-link text-white">
                    <svg className="bi me-2" width="16" height="32"></svg>
                    Keşfet
                    </Link>
                </li>
                <li>
                    <Link to="/reels" className="nav-link text-white">
                    <svg className="bi me-2" width="16" height="32"></svg>
                    Reels
                    </Link>
                </li>
                <li>
                    <Link to="/chats" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                        Mesajlar
                    </Link>
                </li>
                <li style={{display: "flex", alignItems: "center"}}>
                    <button onClick={()=>setNotificationPanel(!notificationPanel)} className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                        Bildirimler
                    </button>
                    {
                       {/* auth.user.name && auth.user.notification.find(n=>n.isRead == false) &&
                        <i class="bi bi-dot" style={{color: "red", fontSize: "45px"}}></i> */}
                    }
                    
                </li>
                <li>
                    <Link to="/create" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                        Oluştur
                    </Link>
                </li>
                <li>
                    <Link to={`/profile/${auth.user._id}`} className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                        Profil
                    </Link>
                </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <ul aria-labelledby="dropdownUser1" style={profileMenu ? {display: "block", listStyleType: "none"} : {display: "none"}}>
                        <li><Link className="dropdown-item" to="/create">Yeni Post...</Link></li>
                        <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profil</Link></li>
                        <li><Link className="dropdown-item" onClick={()=>signOutOperation()}>Çıkış Yap</Link></li>
                    </ul>
                    <NavLink to={`/profile/${auth.user._id}`} style={{textDecoration: "none"}}>
                        <div onClick={()=>{profileMenu ? setProfileMenu(false):setProfileMenu(true)}} className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src={auth.user.profilePhoto} alt="" width="32" height="32" className="rounded-circle me-2" />
                            <strong>{auth.user.name}</strong>
                        </div>
                    </NavLink>
                </div>
            </div>
            <div id="searchPanel" style={{display: searchPanel ? "block":"none"}}>
                <div id="inputsSearch" style={{marginBottom: "15px"}}>
                    <form method="post" style={{display: "flex", alignItems: "center"}} onSubmit={getSearchedUserSubmit}>
                        <input type="text" name="searchtxt" className="form-control" />
                        <button type="submit" className="btn btn-primary">Ara</button>
                    </form>
                </div>
                {
                    searchedUser && searchedUser.users.map(s=>(
                        <NavLink to={`profile/${s._id}`} style={{textDecoration: "none", color: "#fff"}}>
                            <div id="card" style={{display: "flex", alignItems: "center", marginBottom: "15px"}}>
                                <img src="https://github.com/mdo.png" alt="resim" style={{width: "45px", borderRadius: "100px", marginRight: "10px"}} />
                                <span>{s.name}</span>
                            </div>
                        </NavLink>
                    ))
                }
            </div>  
            <div id="notificationPanel" style={{display: notificationPanel ? "block":"none"}}>
                {
                    {/* newNotification == null ? 
                    auth.user.notification.map((n, index)=>n.isRead == false ? 
                        <div key={index} onClick={()=>readNotification(n._id)} title="Okundu Olarak İşaretle" style={n.isRead == false ? {cursor: "pointer", backgroundColor: "#272b33", borderRadius: "10px", padding: "10px"}:{}}>
                            <b style={{fontSize: "18px"}}>{allUsers && allUsers.find(a=>a._id == n.userId).name}</b>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <p>{n.details}</p>
                                <i class="bi bi-patch-check mb-2"></i>
                            </div>
                        </div>:<></>
                    ):
                    newNotification && newNotification.map((n, index)=>(
                        <div key={index} title="Okundu Olarak İşaretle" style={n.isRead == false ? {cursor: "pointer", backgroundColor: "#19191a", borderRadius: "10px", padding: "10px"}:{}}>
                            <b style={{fontSize: "18px"}}>{allUsers && allUsers.find(a=>a._id == n.userId).name}</b>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <p>{n.details}</p>
                                <i class="bi bi-patch-check mb-2"></i>
                            </div>
                        </div>
                    )) */}
                   
                }
            </div>
            <div className="container" style={{width: "calc(100% - 280px)", color: "#fff", paddingLeft: "30px", paddingTop: "30px"}}>
                <Outlet/>
            </div>
        </div>
    );
};

export default MainLayout;
