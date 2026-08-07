import { create } from "../../services/prodservice";
import { index as supplierIndex } from "../../services/supplierservice";
import { index as categoryIndex } from "../../services/categoryservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateProd() {
    const navigate = useNavigate();
    const [err, setErr] = useState("");
    const [form, setForm] = useState({
        name: "",
        price: "",
        category_id: "",
        supplier_id: "",
        description: ""
    });
    const [loading, setLoading] = useState(true);
    const [category, setCategories] = useState([]);
    const [supplier, setSuppliers] = useState([]);
    const [image, setImage] = useState([]);

    const getCategory = async () => {
        try {
            const response = await categoryIndex();
            setCategories(response.data.data.data);
        } catch (err) {
            console.log(err.message)
        } finally {
            return setLoading(false);
        }
    }
    const getSupplier = async () => {
        try {
            const response = await supplierIndex();
            setSuppliers(response.data.data);
        } catch (err) {
            console.log(err.message)
        } finally {
            return setLoading(false);
        }
    }
    useEffect(() => {
        getCategory();
        getSupplier();
    }, []);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await create(form, image);
            alert("Thêm thành công");
            navigate("/product");
        } catch (err) {
            console.log(err.response.data);
        }
    }
    if (loading) {
        return <div className="supplier-loading">
            <h1>Loading...</h1>
        </div>
    }
    if (err) {
        return <h2>Không thể lấy danh sách nhà cung cấp</h2>
    }
    return (
        <>
            <div className="product-create-container">
                <form className="product-create-form" onSubmit={handleSubmit}>

                    <h2 className="product-create-title">Thêm sản phẩm</h2>

                    <div className="form-group">
                        <label>Ảnh sản phẩm</label>
                        <input
                            type="file"
                            multiple
                            onChange={(e) => setImage(Array.from(e.target.files))}
                        />
                    </div>

                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Nhập tên sản phẩm..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Danh mục</label>
                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {category.map(cate => (
                                <option key={cate.id} value={cate.id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Nhà cung cấp</label>
                        <select
                            name="supplier_id"
                            value={form.supplier_id}
                            onChange={handleChange}
                        >
                            <option value="">-- Chọn nhà cung cấp --</option>
                            {supplier.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Giá</label>
                        <input
                            type="number"
                            name="price"
                            value={form.price}
                            onChange={handleChange}
                            placeholder="Nhập giá..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Mô tả</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button className="btn btn-primary" type="submit">
                        Lưu sản phẩm
                    </button>

                </form>
            </div>
        </>
    )
}
export default CreateProd;