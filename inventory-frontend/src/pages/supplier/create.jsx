import { useState } from "react";
import { create } from "../../services/supplierservice";
import { useNavigate } from "react-router-dom";
import "../../components/supplier.css";

function CreateSupp() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
            const response = await create(form);
            alert("Thêm thành công");
            navigate("/supplier");
        } catch (err) {
            alert(err.response?.data?.message || "Có lỗi xảy ra");
            console.log(error.response.data);
        }
    }
    return (
    <div className="crud-page">

        <div className="crud-header">
            <div>
                <h2>Thêm nhà cung cấp</h2>
                <span>Thêm nhà cung cấp mới vào hệ thống</span>
            </div>
        </div>

        <div className="crud-card">

            <form className="crud-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Tên nhà cung cấp</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nhập tên nhà cung cấp..."
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                    />
                </div>

                <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nhập số điện thoại..."
                    />
                </div>

                <div className="form-group">
                    <label>Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Nhập địa chỉ..."
                    />
                </div>

                <div className="form-footer">

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Lưu nhà cung cấp
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/supplier")}
                    >
                        Hủy
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}
export default CreateSupp;