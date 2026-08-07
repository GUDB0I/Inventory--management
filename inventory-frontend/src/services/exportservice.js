import api from "../api/axios";

export const index = ()=>{
    console.log("Lấy dữ liệu danh mục");
    return api.get("/stockexport/index");
}

export const show = (id) => {
    console.log('Sửa  sản phẩm');
    return api.get(`/stockexport/show/${id}`)
}

export const create = (data) => {
    console.log('Thêm đơn hàng');
    return api.post("/stockexport/store", data);
};

export const filter = (data) => {
    return api.get("/stockexport/filter", {
        params: data
    });
};

export const getUsers  = ()=>{
    console.log('Lấy người dùng thành công');
    return api.get("/user/index");
}