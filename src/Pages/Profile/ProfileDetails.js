import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "../../Style/card.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


const ProfileDetails = () => {
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [userPost, setUserPost] = useState(null);
    const [showPanel, setShowPanel] = useState({visible: false, postInfo: {}});
    

    const auth = useSelector(state => state.auth);

    const followNewUser = async(id, e) =>{
        const response = await axios.get(`http://localhost:8000/api/auth/newfollowing?myuserid=${auth.user._id}&userid=${id}`);
        const data = response.data;
        if (data.status === `Followed`) {
            e.target.style.backgroundColor = "black";
            e.target.style.content = "Takipten Çık";
            e.target.style.color = "white";
        } else{
            e.target.style.backgroundColor = "#0D6EFD";
            e.target.style.content = "Takip et";
            e.target.style.color = "white";
        }

        return console.log(data);
    };

    const getUser = async()=>{
        const response = await axios.get("http://localhost:3000/api/auth/userdetails?userid="+id);
        const data = response.data;
        setUser(data);
    };

    const postShowPanel = (id) =>{
        if (!showPanel.visible) {
            const post = userPost.find(data=>data._id == id);
            setShowPanel({visible: true, postInfo: post});
            return;
        }
        setShowPanel({visible: false, postInfo: {}});
    };

    const getUserPost = async() =>{
        const response = await axios.get(`http://localhost:3000/posts/user/${id}`);
        const posts = response.data;

        setUserPost(posts);
    };

    useEffect(()=>{
        setUser(null);
        setUserPost(null);
        getUser();
        getUserPost();
    }, [id]);

    return (
        <div style={{marginLeft: "130px"}}>
            
            {user && userPost && <div>
                <div id="userinfo" style={{marginLeft: "120px", marginTop: "42px"}} className="row">
                <div className="col-4">
                    <img src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png" style={{width: "150px",border: "1px solid gray", borderRadius: "150px"}} alt="resim" />
                </div>
                <div className="col-8">
                    <h5 className="me-4">{user.name}</h5>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "30px"}}>
                        {
                            auth.user._id == id ? 
                            <>
                                <button className="btn btn-dark me-3">Profili Düzenle</button>
                                <button className="btn btn-dark me-3"><NavLink to={`/create`} style={{textDecoration: "none", color: "#fff"}}>Yeni Post</NavLink></button>
                                <button className="btn btn-dark">Ayarlar</button>
                            </>:
                            <>
                                {
                                    auth.user.following.find(a=>a.userId == id) ? 
                                    <button className="btn btn-dark me-3 mt-2" onClick={(e)=>followNewUser(id, e)}>Takipten Çık</button>
                                    :<button className="btn btn-primary me-3 mt-2" onClick={(e)=>followNewUser(id, e)}>Takip Et</button>  
                                }
                            </>
                        }
                        
                    </div>
                    <div style={{display: "flex", alignItems: "center", marginBottom: "10px"}}>
                        <p className="me-3"><b>{user.posts.length}</b> Gönderi</p>
                        <p className="me-3"><b>{user.follower.length}</b> Takipçi</p>
                        <p><b>{user.following.length}</b> Takip</p>
                    </div>
                    <div id="bio">
                        <p>{user.bioTxt}</p>
                    </div>
                </div>
                </div>
                <div id="stories" className="mt-5 mb-5">
                    {
                        user.stories.map(s=>(
                            <div style={{display: "inline-block"}} className="me-4">
                                <img src={s.storyUrl} style={{width: "100px"}} alt="res" />
                                <p style={{display: "block", margin: "auto", textAlign: "center"}}>{s.title}</p>
                            </div>
                        ))
                    }
                    <div style={{display: "inline-block"}} className="me-4">
                        <img src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png" style={{width: "100px"}} alt="res" />
                        <p style={{display: "block", margin: "auto", textAlign: "center"}}>ajskldasjdklas</p>
                    </div>
                </div>
                <div id="postShowPanel" style={{display: showPanel && showPanel.visible ? "block": "none"}}>
                    
                    { userPost.postInfo && userPost.postInfo.postUrl.slice(userPost.postInfo.postUrl.length - 3) == "jpg"?
                        <div>
                            <img src="http://localhost:3000/uploads/posts/posts_1704839628430_20220801_215054.jpg" alt="" />
                        </div>: <div>
                            <video controls style={{textDecoration: "none", width: "550px", height: "400px"}}>
                                <source src={`http://localhost:3000/uploads/posts/posts_1704839613613_deneme.mp4`} type="video/mp4"/>
                            </video>
                        </div>
                    }
                    <div>
                    </div>
                </div>
                <div id="postAndSaved" className="mt-5">
                    <div id="post" style={{display: "flex"}}>
                        {userPost.map(p=>(
                            <>
                                {
                                    p.postUrl.slice(p.postUrl.length - 3) == "jpg" ? 
                                    <img src={p.postUrl} alt="a" onClick={()=>postShowPanel(p._id)} style={{objectFit: "contain",width: "310px", height: "310px", border: "1px solid white"}} />
                                    : <video onClick={()=>postShowPanel(p._id)} style={{width: "310px", height: "310px", border: "1px solid white"}}>
                                        <source src={p.postUrl} type="video/mp4"/>
                                    </video>
                                }
                            </>
                        ))}
                        {/* <img src="https://cpmr-islands.org/wp-content/uploads/sites/4/2019/07/test.png" alt="a" style={{width: "300px", border: "1px solid white"}} /> */}
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default ProfileDetails;
