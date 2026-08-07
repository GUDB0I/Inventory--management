import api from "../api/axios";

export const index = ()=>{
    console.log("Lấy dữ liệu danh mục");
    return api.get("/category/index");
}

export const destroy = (id)=>{
    console.log('Xóa danh mục');
    return api.delete(`/category/destroy/${id}`)
}

export const show = (id)=> {
    console.log('Chi tiết danh mục');
    return api.get(`/category/show/${id}`)
}

export const update = (id,data)=> {
    console.log('Sửa danh mục');
    return api.put(`/category/update/${id}`,data)
}

export const create = (data) => {
    console.log('Thêm danh mục');
    return api.post("/category/store",data)
}