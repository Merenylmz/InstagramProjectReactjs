import React, { useEffect, useState } from "react";
import "../../Style/card.css";
import axios from "axios";
import {useSelector} from "react-redux";

const Reels = () => {
    const [commentInput, setCommentInput] = useState(``);
    const [index, setIndex] = useState(0);
    const [reels, setReels] = useState(null);
    const [commentsCards, setCommentCards] = useState(false);
    const [likeBtn, setLikeBtn] = useState(false);

    const auth = useSelector(state=>state.auth);

    const handleCommentSubmit = async(e, reelsId) =>{
        e.preventDefault();
        const response = await axios.post(`http://localhost:8000/api/reels/addcomment?userid=${auth.user._id}&reelsid=${reelsId}`, {
            comment: commentInput
        });
        const {comments} = response.data;
        setReels({...reels.comments, comments});
        console.log(comments);
        return comments;
    };

    const likeOperation = async(reelsId, userId) =>{
        const response = await axios.get(`http://localhost:8000/api/reels/like?userid=${userId}&reelsid=${reelsId}`);
        const likeCount = response.data;
        
        setLikeBtn(!likeBtn);
    }   

    const getReels = async(offset = 0) =>{
        const response = await axios.get(`http://localhost:8000/api/reels?offset=${offset}`);
        const data = response.data;
        setReels(data);
        console.log(data);
        return data;
    }

    useEffect(() => {
        
        // Math.random()
        getReels();
    }, []);
    

    return (
        <div className="container mt-3" id="reelsBody">
            {
                reels && <div id="reelsCard">
                <video style={{width: "100%"}} controls autoPlay>
                    <source src={reels.reelsUrl} type="" />
                </video>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <div>
                        {/* <button id="reelsBtn" onClick={()=>likeOperation(reels._id, auth.user._id)}><i className={reels && reels.like.findIndex(r=>r.userId === auth.user._id) !== -1? `bi bi-hand-thumbs-up-fill`:`bi bi-hand-thumbs-up`}></i></button> */}
                        <button id="reelsBtn" onClick={()=>likeOperation(reels._id, auth.user._id)}><i className={`bi bi-hand-thumbs-up`}></i></button>
                        <button id="reelsBtn" onClick={()=>setCommentCards(!commentsCards)}><i className="bi bi-chat-dots"></i></button>
                    </div>
                    <div>
                        <button id="reelsBtn"><i class="bi bi-bookmark"></i></button>
                        {/* <button id="reelsBtn"><i class="bi bi-three-dots"></i></button> */}
                    </div>
                </div>
                <h5 className="mt-3 ms-2">{reels.title}</h5>
                <p className="mt-3 ms-2">{reels.description}</p>
                <div id="commentsCards" style={{display: commentsCards ? "block" : "none"}}>
                    {
                        reels.comments && reels.comments.map(c=>(
                            <div style={{display: "flex", alignItems: "start"}}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnsB7Z3VJ1WHLjIRaOjcFpryJxmYcth2z6Td9Cn07hGg&s" style={{width: "50px", border: "1px solid gray", borderRadius: "100px"}} alt="" />
                                <div>
                                    <b className="ms-2 w-100">{c.user.name};</b><br />
                                    <p className="ms-3">{c.comment}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <form method="post" onSubmit={(e)=>handleCommentSubmit(e, reels._id)}>
                    <div style={{marginTop: "70px", marginBottom: "15px" , display: "flex", alignItems: "center"}}>
                        <input type="text" id="commentInput" placeholder="Metin Giriniz..." onChange={(e)=>setCommentInput(e.target.value)} className="form-control"/>
                        <button className={`btn btn-dark ${commentInput === `` && `disabled`}`} type="submit">Gönder</button>
                    </div>
                </form>
                <small>Yorumları görmek için yoruma tıkla</small>
                <div id="commentsPreview" style={{display: "flex", alignItems: "center"}} onClick={()=>setCommentCards(!commentsCards)}>
                    <b style={{marginRight: "10px"}}>{reels.comments[0] && reels.comments[0].user.name}:</b>
                    <article>{reels.comments[0] && reels.comments[0].comment}</article>
                </div> 
            </div>
            }
            
        </div>
    );
};

export default Reels;
