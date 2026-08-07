import { show } from "../../services/prodservice";
import { update } from "../../services/prodservice";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { index as supplierIndex } from "../../services/supplierservice";
import { index as categoryIndex } from "../../services/categoryservice";
import "../../components/product.css";

function UpdateProd() {
    const [image, setImage] = useState([]);
    const [category, setCategory] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category_id: "",
        supplier_id: "",
        description: "",
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const getProd = async () => {
        try {
            const response = await show(id);
            setForm(response.data.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }

    const getCategory = async () => {
        try {
            const response = await categoryIndex();
            setCategory(response.data.data.data);
        } catch (err) {
            console.log(err.response?.data)
        }
    }
    const getSupplier = async () => {
        try {
            const response = await supplierIndex();
            setSupplier(response.data.data);
        } catch (err) {
            console.log(err.response?.data)
        }
    }
    useEffect(() => {
        getCategory();
        getSupplier();
        getProd();
    }, [id]);
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await update(id, form, image);
            alert("Cập nhật thành công");
            navigate("/product")
        } catch (err) {
            console.log(err);
            console.log(err.response?.status);
            console.log(err.response?.data);
        }
    }

    return (
        <>
            <div className="product-create-container">
                <div className="update-container">
                    <div className="images-side">
                        {form.images?.length > 0 && (
                            <div className="form-group">
                                <label>Ảnh hiện tại</label>

                                <div className="image-list">
                                    {form.images.map((img) => (
                                        <img
                                            key={img.id}
                                            src={`http://127.0.0.1:8000/storage/${img.image_path}`}
                                            alt=""
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <form className="product-create-form" onSubmit={handleSubmit}>

                        <h2 className="product-create-title">Sửa sản phẩm</h2>

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
                            Sửa sản phẩm
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}
export default UpdateProd;