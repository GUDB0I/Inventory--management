import api from "../api/axios";

export const index = ()=>{
    console.log("Lấy danh sách supplier");
    return api.get("/supplier/index")
}

export const destroy = (id)=>{
    console.log('Xóa nhà cung cấp');
    return api.delete(`/supplier/destroy/${id}`)
}

export const show = (id)=> {
    console.log('Sửa nhà cung cấp');
    return api.get(`/supplier/show/${id}`)
}

export const update = (id,data)=> {
    console.log('Sửa nhà cung cấp');
    return api.put(`/supplier/update/${id}`,data)
}

export const create = (data) => {
    console.log('Thêm nhà cung cấp');
    return api.post("/supplier/store",data)
}