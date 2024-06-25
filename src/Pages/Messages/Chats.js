import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../Style/card.css";

const Chats = () => {

    const [chats, setChats] = useState(null);
    const [messages, setMessages] = useState(null);
    const [followingUser, setFollowingUser] = useState(null);
    const [followingPanel, setFollowingPanel] = useState(false);
    const [allUsers, setAllUsers] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [chatCreatorId, setChatCreatorId] = useState(null);


    const auth = useSelector(state=>state.auth);

    const getAllUsers = async() =>{
        const response = await axios.get("http://localhost:3000/auth/allusers");
        const data = response.data;
        setAllUsers(data);
        return data;
    }

    const getChats = async() =>{
        const response = await axios.get(`http://localhost:3000/chats/getchats?userid=${auth.user._id}`);
        const chatsdata = response.data;
        setChats(chatsdata);
    };

    const getMessage = async({chatId, toUser})=>{
        setMessages(null);
        const response = await axios.get(`http://localhost:3000/chats/getmessage?chatid=${chatId}`);
        const messagesData = response.data;
        setChatCreatorId(messagesData.user1Id);
        setMessages({...messagesData, toUser, chatId});
    };

    const sendMessage = async(msgTxt, chatId, senderId, receiverId) =>{
        const response = await axios.post(`http://localhost:3000/chats/send?chatid=${chatId}&senderid=${senderId}&receiverid=${receiverId}`, {
            message: msgTxt
        });
        const data = response.data;
        return data;
    }

    const getFollowingUsers = async() =>{
        const response = await axios.get(`http://localhost:3000/auth/getfollowing?userid=${auth.user._id}`);
        const followingUsersData = response.data.following;

        setFollowingUser(followingUsersData);
        return followingUsersData;
    };

    const followingUserBtn = async() =>{
        !followingPanel ? setFollowingPanel(true) : setFollowingPanel(false);
        if (!followingUser) {
            const allUsersArray = await getAllUsers();
            const allFollowingArray = await getFollowingUsers();

            const infoArray = allUsersArray.filter(a => allFollowingArray.some(f =>f.userId === a._id));
            setUserInfo(infoArray);
        }
    };

    const createChat = async(user2Id) =>{
        const response = await axios.post(`http://localhost:3000/chats/newchat?user1id=${auth.user._id}&user2id=${user2Id}`);
        const {status} = response.data;

        if (!status) {
            return alert("Bu Chat zaten mevcut");
        }
        
        setFollowingPanel(false);
        getChats();
        return status;
    };

    const handleSendSubmit = async(e) =>{
        e.preventDefault();
        let msg = e.target.message.value;
        await sendMessage(msg, messages.chatId, auth.user._id, messages.toUser._id);
        getMessage(messages);
    }

    useEffect(() => {
        getChats();
    }, []);


    return (
        <>
        <div style={{color: "#fff", display: "flex"}}>
            <div className="d-flex flex-column flex-shrink-0 p-3 text-white" style={{width: "90px", backgroundColor: "black", height: "100vh", borderRight: "1px solid gray", position: "fixed"}}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none" >
                <i className="bi bi-instagram" style={{marginLeft: "19px", fontSize: "25px"}}></i>
                </a>
                <hr />
                <ul className="nav nav-pills flex-column mb-auto" style={{fontSize: "23px"}}>
                <li className="nav-item">
                    <Link to="/home" className="nav-link text-white" aria-current="page">
                    <i className="bi bi-house-door-fill me-3"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/search" className="nav-link text-white">
                    <i className="bi bi-search"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/posts" className="nav-link text-white">
                    <i className="bi bi-compass"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/reels" className="nav-link text-white">
                    <i className="bi bi-collection-play"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/messages" className="nav-link text-white">
                    <i className="bi bi-chat-dots"></i>
                    </Link>
                </li>
                <li>
                    <button to="#" className="nav-link text-white">
                    <i className="bi bi-heart"></i>
                    </button>
                </li>
                <li>
                    <Link to="/create" className="nav-link text-white">
                    <i className="bi bi-plus-square"></i>
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className="nav-link text-white">
                        <svg className="bi me-2" width="16" height="32"></svg>
                    </Link>
                </li>
                </ul>
                <hr />
                {/* <div className="dropdown">
                    <ul aria-labelledby="dropdownUser1" style={profileMenu ? {display: "block", listStyleType: "none"} : {display: "none"}}>
                        <li><Link className="dropdown-item" to="/create">Yeni Post...</Link></li>
                        <li><Link className="dropdown-item" href="/profile">Profil</Link></li>
                        <li><Link className="dropdown-item" onClick={()=>console.log("asdasd")}>Çıkış Yap</Link></li>
                    </ul>
                    <div onClick={()=>{profileMenu ? setProfileMenu(false):setProfileMenu(true)}} className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                        <strong>Birisi</strong>
                    </div>
                </div> */}
            </div>
            <div id="chats" style={{marginLeft: "120px", width: "300px", borderRight: "1px solid gray", height: "100vh"}}>
                <div style={{display: "flex", justifyContent: "space-between", paddingTop: "10px"}}>
                    <h4>Hesap Adı</h4>
                    <button className="btn btn-sm btn-dark me-2" onClick={followingUserBtn}>Oluştur</button>
                    <button onClick={()=>console.log(messages)}>asdasd</button>
                </div>
                <p>Mesajlar</p>
                <div id="chatcards">
                    {
                        chats && chats.map((c, index)=>(
                            <div id="chatCard" key={index} style={{display: "flex", alignItems: "center", margin: "20px 0"}} onClick={()=>getMessage(c)}>
                                <img src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png" style={{width: "60px", borderRadius: "100px", border:"1px solid gray", marginRight: "15px" }} alt="resim" />
                                <p>{c.toUser.name}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
            <div id="messages">
                {
                    messages && <div id="topBar" style={{height: "70px", borderBottom: "1px solid gray", width: "980px",padding: "10px", display: "flex", alignItems: "center"}}>
                        <img src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png" style={{width: "50px", borderRadius: "100px", border:"1px solid gray", marginRight: "15px" }} alt="resim" />
                        <p>Kişi ismi</p> 
                    </div>
                }

                {
                    messages && <><div id="messagesCards" style={{padding: "30px", overflowY: "scroll", height: "700px"}}>  
                        {
                            messages.messages.map((msg, index)=>(
                                
                                chatCreatorId === msg.senderId ? 
                                <div id="msgCard" key={index} style={{marginBottom: "15px"}}>
                                    <div style={{display: "flex", alignItems: "center", width: "100%"}}>
                                        <img src={messages.toUser.profilePhoto} style={{width: "50px", borderRadius: "100px", border:"1px solid gray", marginRight: "15px" }} alt="resim" />
                                        <div style={{backgroundColor: "purple", padding: "10px" ,display: "inline-block", borderRadius: "20px"}}>
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                </div> : <>
                                    <div id="msgCard otherUserMsg" key={index} style={{display: "flex", alignItems: "center", marginBottom: "15px", float: "right"}}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src={messages.toUser.profilePhoto} style={{width: "50px", borderRadius: "100px", border:"1px solid gray", marginRight: "15px" }} alt="resim" />
                                            <div style={{backgroundColor: "purple", padding: "10px" ,display: "inline-block", borderRadius: "20px"}}>
                                                <p>{msg.message}</p>
                                            </div>
                                        </div>
                                    </div><span style={{clear:"both"}}></span>
                                </>
                            ))
                        }
                        
                    </div>
                    <div id="inputs">
                        <form method="post" onSubmit={handleSendSubmit} style={{position: "absolute", bottom: "0", width: "70%", display: "flex", alignItems: "center"}}>
                            <input type="text" name="message" className="form-control" style={{backgroundColor: "black", margin: "10px", color: "#fff"}} placeholder="Mesaj giriniz..."/>
                            <button type="submit" className="btn btn-primary btn-sm">Send</button>
                        </form>
                    </div> </>
                }
                
            </div>
        </div>
        <button onClick={()=>console.log(chatCreatorId, messages.user1Id)}>ASDASDAS</button>
        <div id="followingPanel" style={{display: followingPanel ? "block": "none"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <h3 style={{textAlign: "center"}}>Kullanıcı Listesi</h3>
                <button type="button" style={{backgroundColor: "transparent", color: "#fff", border: "0", fontSize: "20px"}} onClick={()=>setFollowingPanel(false)}>X</button>
            </div>
            <div className="mt-4">
                <div id="userCards">
                    {
                        userInfo && userInfo.map((u, index)=>(
                            <div className="row g-0 mb-3" key={index} style={{alignItems: "center"}}>
                                <div className="col-md-2">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsB7Z3VJ1WHLjIRaOjcFpryJxmYcth2z6Td9Cn07hGg&s"  alt="..." style={{width: "60px", border: "1px solid gray", borderRadius: "100px"}}/>
                                </div>
                                <div className="col-md-6">
                                    <div className="card-body">
                                        <h5 className="card-title">{u.name}</h5>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card-body">
                                        <button type="button" className="btn btn-primary btn-sm" onClick={()=>createChat(u._id)}>Mesaj At</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    );
};

export default Chats;
