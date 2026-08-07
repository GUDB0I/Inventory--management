import api from "../api/axios";

export const index = ()=>{
    console.log("Lấy dữ liệu danh mục");
    return api.get("/dashboard/index");
}