import axios from "axios";

export const login = async(datas) =>{
    try {
        const response = await axios.post("http://localhost:8000/api/auth/login", datas);
        const data = response.data;

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const register = async(datas) =>{
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register", datas);
        const data = response.data;

        return data;
    } catch (error) {
        console.log(error);
    }
};
