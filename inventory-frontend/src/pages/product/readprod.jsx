import { index } from "../../services/prodservice";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../components/product.css";
import { destroy } from "../../services/prodservice";
import { useNavigate } from "react-router-dom";
import { filter } from "../../services/prodservice";
import { index as supp } from "../../services/supplierservice";
import { index as cate } from "../../services/categoryservice";

function Product() {
    const navigate = useNavigate();
    const [prod, setProd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [search, setSearch] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [supplierId, setSupplierId] = useState("");
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    // Lấy sản phẩm
    const getProd = async () => {
        try {
            const response = await index();
            const cateresponse = await cate();
            const suppresponse = await supp()
            setSuppliers(suppresponse.data.data);
            setCategories(cateresponse.data.data);
            setProd(response.data.data);


        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProd();
    }, [])
    // Xóa sản phẩm
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp?")) {
            return;
        }

        try {
            await destroy(id);
            alert("Xóa thành công");
            setProd(prev =>
                prev.filter(item => item.id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    }


    const handleFilter = async () => {

        const res = await filter({
            search: search,
            category_id: categoryId,
            supplier_id: supplierId
        });

        console.log(res.data.data);
        setProd(res.data.data)

    }
    useEffect(() => {
        handleFilter()
    }, [
        search,
        categoryId,
        supplierId
    ]);

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
            <div className="crud-page">
                <div className="product-filter">

                    <input
                        type="text"
                        placeholder="Tìm sản phẩm..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">
                            Tất cả danh mục
                        </option>

                        {categories.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}

                    </select>


                    <select
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                    >

                        <option value="">
                            Tất cả nhà cung cấp
                        </option>

                        {suppliers.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}

                    </select>

                </div>
                <div className="crud-header">
                    <div>
                        <h2>Quản lý sản phẩm</h2>
                        <span>Danh sách tất cả sản phẩm trong hệ thống</span>
                    </div>

                    <Link
                        to="/product/create"
                        className="btn btn-secondary"
                    >
                        + Thêm sản phẩm
                    </Link>
                </div>

                <div className="crud-card">

                    <table className="crud-table">

                        <thead>
                            <tr>
                                <th style={{ width: "70px" }}>STT</th>
                                <th>Danh mục</th>
                                <th style={{ width: "390px" }}>Tên sản phẩm</th>
                                <th style={{ width: "140px" }}>Hàng tồn</th>
                                <th>Gía bán</th>
                                <th style={{ width: "150px" }}>Thao tác</th>
                            </tr>
                        </thead>

                        <tbody>

                            {prod.length > 0 ? (

                                prod.map((item, index) => (

                                    <tr key={item.id}>

                                        <td className="text-center">
                                            {index + 1}
                                        </td>
                                        <td className="category-name">
                                            {item.category?.name}
                                        </td>
                                        <td className="name">
                                            {item.name}
                                        </td>
                                        <td className="stock">
                                            {item.stock} sản phẩm
                                        </td>
                                        <td className="category-name">
                                            {Number(item.price).toLocaleString("vi-VN")} đ
                                        </td>

                                        <td>

                                            <div className="action-group">

                                                <button
                                                    className="btn btn-edit"
                                                    onClick={() =>
                                                        navigate(`/product/update/${item.id}`)
                                                    }
                                                >
                                                    ✏ Sửa
                                                </button>

                                                <button
                                                    className="btn btn-delete"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    🗑 Xóa
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="3"
                                        className="empty-table"
                                    >
                                        Không có dữ liệu
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </>
    )
}
export default Product;