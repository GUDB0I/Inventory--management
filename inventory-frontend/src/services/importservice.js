import api from "../api/axios";

export const index = ()=>{
    console.log("Lấy dữ liệu đơn nhập");
    return api.get("/stockimport/index");
}

export const show = (id) => {
    console.log('Chi tiết đơn hàng');
    return api.get(`/stockimport/show/${id}`)
}

export const create = (data) => {
    console.log('Thêm đơn hàng');
    return api.post("/stockimport/store", data);
};

export const filter = (data) => {
    return api.get("/stockimport/filter", {
        params: data
    });
};