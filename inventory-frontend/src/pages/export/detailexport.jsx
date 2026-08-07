import { show } from "../../services/exportservice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

function DetailExport() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [stockex, setExport] = useState([]);
    const navigate = useNavigate();

    const getImport = async () => {
        try {
            const response = await show(id);
            setExport(response.data.data);
        } catch (err) {
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getImport();
    }, []);
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
            <div className="container">

                <h2>📦 Chi tiết phiếu xuất #{stockex.id}</h2>

                <div className="import-card">

                    <p>
                        <strong>Nhà cung cấp:</strong> {stockex.supplier?.name}
                    </p>

                    <p>
                        <strong>Người tạo:</strong> {stockex.user?.name}
                    </p>

                    <p>
                        <strong>Ngày nhập:</strong> {stockex.import_date}
                    </p>

                </div>

                <h3>Danh sách sản phẩm</h3>

                <div className="import-list">

                    {stockex.details?.map((detail) => (
                        <div className="import-card" key={detail.id}>
                             <p>
                                <strong>Mã đơn xuất:</strong>{" "}
                                {detail.stock_export_id}
                            </p>
                            <p>
                                <strong>Sản phẩm:</strong>{" "}
                                {detail.product?.name}
                            </p>

                            <p>
                                <strong>Số lượng:</strong>{" "}
                                {detail.quantity}
                            </p>

                            <p>
                                <strong>Giá nhập:</strong>{" "}
                                {Number(detail.unit_price).toLocaleString("vi-VN")} đ
                            </p>

                            <p>
                                <strong>Thành tiền:</strong>{" "}
                                {Number(detail.subtotal).toLocaleString("vi-VN")} đ
                            </p>

                        </div>
                    ))}

                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/stockexport")}
                >
                    ← Quay lại
                </button>

            </div>
        </>
    )
}
export default DetailExport;