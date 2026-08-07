import api from "../api/axios";

export const index = () => {
    console.log("Lấy danh sách  sản phẩmr");
    return api.get("/product/index")
}

export const destroy = (id) => {
    console.log('Xóa  sản phẩm');
    return api.delete(`/product/destroy/${id}`)
}

export const show = (id) => {
    console.log('Sửa  sản phẩm');
    return api.get(`/product/show/${id}`)
}

export const update = (id, data,images) => {
    console.log('Sửa  sản phẩm');
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    images.forEach((image) => {
        formData.append("images[]", image);
    });
    return api.put(`/product/update/${id}`, formData);
}

export const create = (data, images) => {
    console.log("Thêm sản phẩm");

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    images.forEach((image) => {
        formData.append("images[]", image);
    });

    return api.post("/product/store", formData);
};


export const filter = (params) => {
    return api.get("/product/searchfilter", {
        params
    });
}