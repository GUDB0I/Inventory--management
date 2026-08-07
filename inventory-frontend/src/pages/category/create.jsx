import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { create } from "../../services/categoryservice";

function CreateCate(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
    });
    const [err, setErr] = useState("");

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e)=>{
       e.preventDefault();
        try{
            const response = await create(form);
            alert("Thêm thành công");
            navigate("/category");
        }catch(err){
            alert(err.response?.data?.message || "Có lỗi xảy ra");
            console.log(error.response.data);
        }
    }
    return (
    <div className="crud-page">

        <div className="crud-header">
            <div>
                <h2>Thêm danh mục</h2>
                <span>Tạo danh mục mới cho hệ thống</span>
            </div>
        </div>

        <div className="crud-card">

            <form className="crud-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Tên danh mục</label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nhập tên danh mục..."
                    />
                </div>

                <div className="form-footer">

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Lưu danh mục
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/category")}
                    >
                        Quay lại
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}
export default CreateCate;