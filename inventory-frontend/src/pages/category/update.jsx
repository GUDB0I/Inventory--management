import { update } from "../../services/categoryservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { show } from "../../services/categoryservice";
import { useParams } from "react-router-dom";

function UpdateCate() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
    });
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    const getInfo = async () => {
        try {
            const response = await show(id);
            setForm(response.data.data);
        } catch (err) {
            console.log(err.message);
        }finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        getInfo(id);
    },[id])
    if (loading) {
        return <div className="supplier-loading">
            <h1>Loading...</h1>
        </div>
    }
    if (err) {
        return <h2>Không thể lấy danh sách danh mục</h2>
    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await update(id,form);
            alert("Cập nhật thành công");
            navigate("/category");
        } catch (err) {
            alert(err.response?.data?.message || "Có lỗi xảy ra");
            console.log(err.response.data);
        }
    }
    return (
    <div className="crud-page">

        <div className="crud-header">
            <div>
                <h2>Sửa danh mục</h2>
                <span>Cập nhật thông tin danh mục</span>
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
                        Cập nhật
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/category")}
                    >
                        Hủy
                    </button>

                </div>

            </form>

        </div>

    </div>
);
}
export default UpdateCate;