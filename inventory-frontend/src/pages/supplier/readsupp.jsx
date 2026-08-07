import { index } from "../../services/supplierservice";
import { useState, useEffect } from "react";
import { destroy } from "../../services/supplierservice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../components/supplier.css";

function Supplier() {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        async function getSuppliers() {
            try {
                const response = await index();
                setSuppliers(response.data.data)
            } catch (err) {
                setErr(err.message);
            } finally {
                setLoading(false);
            }
        };
        getSuppliers();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa nhà cung cấp?")) {
            return;
        }

        try {
            await destroy(id);
            alert("Xóa thành công");
            setSuppliers(prev =>
                prev.filter(item => item.id !== id)
            );
        } catch (err) {
            console.log(err);
        }
    };
    if (loading) {
        return <div className="supplier-loading">
            <h1>Loading...</h1>
        </div>
    }
    if (err) {
        return <h2>Không thể lấy danh sách nhà cung cấp</h2>
    }
   return (
    <div className="crud-page">

        <div className="crud-header">
            <div>
                <h2>Quản lý nhà cung cấp</h2>
                <span>Danh sách tất cả nhà cung cấp trong hệ thống</span>
            </div>

            <Link
                to="/supplier/create"
                className="btn btn-secondary"
            >
                + Thêm nhà cung cấp
            </Link>
        </div>

        <div className="crud-card">

            <table className="crud-table">

                <thead>
                    <tr>
                        <th style={{ width: "70px" }}>STT</th>
                        <th>Tên nhà cung cấp</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Địa chỉ</th>
                        <th style={{ width: "180px" }}>Thao tác</th>
                    </tr>
                </thead>

                <tbody>

                    {suppliers.length > 0 ? (

                        suppliers.map((item, index) => (

                            <tr key={item.id}>

                                <td className="text-center">
                                    {index + 1}
                                </td>

                                <td>{item.name}</td>

                                <td>{item.email}</td>

                                <td>{item.phone}</td>

                                <td>{item.address}</td>

                                <td>

                                    <div className="action-group">

                                        <button
                                            className="btn btn-edit"
                                            onClick={() =>
                                                navigate(`/supplier/update/${item.id}`)
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
                                colSpan="6"
                                className="empty-table"
                            >
                                Chưa có nhà cung cấp nào.
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    </div>
);
}
export default Supplier;