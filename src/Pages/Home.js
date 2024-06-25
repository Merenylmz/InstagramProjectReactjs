import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {

    const [posts, setPosts] = useState(null);
    const [stories, setStories] = useState(null);
    const [users, setUsers] = useState(null);

    const auth = useSelector(state=>state.auth);
    
    const getDatas = async() =>{
        console.log("Çalışıyor");
        const response = await axios.get(`http://localhost:3000/api/posts/?userid=${auth.user.id}`);
        const posts = response.data;
        setPosts(posts);
        const res = await axios.get(`http://localhost:3000/api/story?userid=${auth.user.id}`);
        const story = res.data;
        setStories(story);
        console.log("Story:",story);

        const r = await axios.get("http://localhost:3000/auth/allusers");
        const allUsersName = r.data;
        setUsers(allUsersName);
        console.log(posts, story, allUsersName);
    };

    useEffect(()=>{
        getDatas();
    }, []);

    return (
        <div className="container mt-3">
            <div className="stories" style={{display: "flex", marginLeft: "180px"}}>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 1</p>
                </div>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 2</p>
                </div>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 3</p>
                </div>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 4</p>
                </div>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 5</p>
                </div>
                <div style={{display: "block", alignItems: "center", justifyContent: "center", marginRight: "25px"}}>
                    <img src="https://github.com/mdo.png" alt="a" style={{height: "60px", borderRadius: "100px", border: "3px solid purple"}} />
                    <p style={{marginLeft: "13px", marginTop: "5px"}}>Kişi 6</p>
                </div>
            </div>
            <div className="posts">
                {
                    posts && posts.map(post=>(
                        <div class="card" style={{width: "450px", marginLeft: "210px", backgroundColor: "black", color: "#fff", borderBottom: "1px solid gray", marginBottom: "100px"}}>
                            <div id="pages" style={{display: "flex", alignItems: "center", margin: "5px 0", justifyContent: "space-between"}}>
                                <div>
                                    {
                                        users && users.map(f=> f._id === post.userId ? (
                                            <>
                                                {
                                                    !f.profilePhoto ? <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsB7Z3VJ1WHLjIRaOjcFpryJxmYcth2z6Td9Cn07hGg&s" alt="resim" style={{height: "45px", borderRadius:"100px", border: "1px solid black"}} />
                                                    : <img src={f.profilePhoto} alt="resim" style={{height: "45px", borderRadius:"100px", border: "1px solid black"}} />
                                                }
                                                <b className="ms-2">{f.name}</b>
                                            </>
                                        ):<></>)
                                    }
                                </div>
                                <h5 className="me-2 mb-3">...</h5>
                            </div>
                            <div>
                                {
                                    post.postUrl.search(/jpg/gi) > 0 ? <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsB7Z3VJ1WHLjIRaOjcFpryJxmYcth2z6Td9Cn07hGg&s" style={{width: "100%"}} alt="post" />:
                                    <video style={{width: "100%"}} controls>
                                        <source src={post.postUrl} type="video/mp4"/>
                                    </video>
 
                                }
                            </div>
                            <div class="card-body">
                                <div id="buttons" style={{marginBottom: "10px" ,display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <div>
                                        <button style={{marginRight: "5px", backgroundColor: "transparent", border: "0px", fontSize: "25px", color: "#fff"}}><i class="bi bi-heart"></i></button>
                                        <button style={{marginRight: "5px", backgroundColor: "transparent", border: "0px", fontSize: "25px", color: "#fff"}}><i class="bi bi-chat"></i></button>
                                        <button style={{marginRight: "5px", backgroundColor: "transparent", border: "0px", fontSize: "25px", color: "#fff"}}><i class="bi bi-send"></i></button>
                                    </div>
                                    <button style={{backgroundColor: "transparent", border: "0px", fontSize: "25px", color: "#fff"}}><i class="bi bi-substack"></i></button>
                                </div>
                                <div id="texts">
                                    <p class="card-text">{post.title}</p>
                                    <p class="card-text">{post.description}</p>
                                </div>
                                <div id="comments" className="mt-3" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                    <input type="text" name="" placeholder="Add Comments..."  id="" className="w-100 me-1" style={{backgroundColor: "black", border: "0"}} />
                                    <button className="btn btn-dark btn-sm ms-0" type="submit">Yayınla</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
};

export default Home;
