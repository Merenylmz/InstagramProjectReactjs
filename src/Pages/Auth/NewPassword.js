import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router";

const NewPassword = () => {
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();
    const {token} = useParams();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await axios.post("http://localhost:8000/api/auth/newpassword?token="+token, {password});
        const {operation} = response.data;
        operation ? navigate("/login") : alert("İşlem Başarısız");
    };
    return (
        <div> <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "120px", color: "white"}}>
        <div style={{border: "1px solid gray", width: "450px", display: "block", padding: "20px", borderRadius: "20px"}}>
            <h3 style={{textAlign: "center"}}>Instagram</h3>
            <form method="post" onSubmit={handleSubmit}>
                <label>Şifre:</label>
                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className="form-control" />
                <button type="submit" className="btn btn-primary w-100 btn-sm">Şifreyi değiştir</button>
            </form>
        </div>
    </div></div>
    )
}

export default NewPassword