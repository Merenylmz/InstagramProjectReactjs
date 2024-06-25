import React, { useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";

const Create = () => {
    const [inputs, setInputs] = useState({name: "", description: "", postUrl: ""});
    const navigate = useNavigate();
    const auth = useSelector(state=>state.auth);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", inputs.name);
        formData.append("description", inputs.description);
        formData.append("postUrl", inputs.postUrl);
        const status = await addOperation(formData);
        await status && status.name ? navigate("/home"):alert("Lütfen bir daha deneyin");
    };

    const addOperation = async(input) =>{
        const response = await axios.post(`http://localhost:3000/posts/?userid=${auth.user._id}`, input);
        const data = response.data;
        
        return data;
    };

    return (
        <div className="container" style={{marginLeft: "130px", width: "100%"}}>
            <img src="https://www.tygerauto.com/mm5/graphics/photos/test-sku.jpg" style={{width: "200px", height: "200px", border: "1px solid gray", marginLeft: "350px"}} alt="" />
            <form onSubmit={handleSubmit} method="post">
                <label>Resim veya Fotoğrafınızı Seçiniz:</label>
                <input type="file" onChange={(e)=>setInputs({...inputs, postUrl: e.target.files[0]})} className="form-control"/>
                <br />
                <label>Başlık Giriniz:</label>
                <input type="text" onChange={(e)=>setInputs({...inputs, name: e.target.value})} className="form-control"/>
                <br />
                <label>Açıklamayı Giriniz:</label>
                <textarea cols={10} onChange={(e)=>setInputs({...inputs, description: e.target.value})} className="form-control"/>
                <br />
                <button className="btn btn-primary btn-sm" type="submit">Kaydet</button>
            </form>
        </div>
    );
};

export default Create;
