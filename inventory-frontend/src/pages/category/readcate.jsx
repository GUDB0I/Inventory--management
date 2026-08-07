import { index } from "../../services/categoryservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { destroy } from "../../services/categoryservice";

function Category() {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const getCategory = async () => {
        try {
            const response = await index();
            setCategory(response.data.data);
        } catch (err) {
            setErr(err.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCategory();
    }, [])

    if (loading) {
        return <div className="supplier-loading">
            <h1>Loading...</h1>
        </div>
    }
    if (err) {
        return <h2>Không thể lấy danh sách nhà cung cấp</h2>
    }

    // xóa danh mục
    const handleDelete = async (id)=>{
        if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp?")) {
            return;
        }
        try{
            await destroy(id);
            alert("Xóa thành công");
            setCategory(prev =>
                prev.filter(item => item.id !== id)
            );
        }catch(err){
            console.log(err);
        }
    }
   return (
    <div className="crud-page">

        <div className="crud-header">
            <div>
                <h2>Quản lý danh mục</h2>
                <span>Danh sách tất cả danh mục trong hệ thống</span>
            </div>

            <Link
                to="/category/create"
                className="btn btn-secondary"
            >
                + Thêm danh mục
            </Link>
        </div>

        <div className="crud-card">

            <table className="crud-table">

                <thead>
                    <tr>
                        <th style={{ width: "70px" }}>STT</th>
                        <th>Tên danh mục</th>
                        <th style={{ width: "180px" }}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>

                    {category.length > 0 ? (

                        category.map((item, index) => (

                            <tr key={item.id}>

                                <td className="text-center">
                                    {index + 1}
                                </td>

                                <td className="category-name">
                                    {item.name}
                                </td>

                                <td>

                                    <div className="action-group">

                                        <button
                                            className="btn btn-edit"
                                            onClick={() =>
                                                navigate(`/category/update/${item.id}`)
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
);
}
export default Category;