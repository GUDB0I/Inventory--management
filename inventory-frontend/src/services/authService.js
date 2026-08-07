import api from "../api/axios";

export const login = (data) => {

    console.log("data gửi lên:", data);

    return api.post("/authentication/login", data);

};
export const register = (data) => {
    return api.post("/authentication/register", data);
};


export const logout = () => {
    return api.post("/authentication/logout");
};