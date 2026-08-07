import { show } from "../../services/importservice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 

function DetailImport() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [stockim, setImport] = useState([]);
    const navigate = useNavigate();

    const getImport = async () => {
        try {
            const response = await show(id);
            setImport(response.data.data);
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

                <h2>📦 Chi tiết phiếu nhập #{stockim.id}</h2>

                <div className="import-card">

                    <p>
                        <strong>Nhà cung cấp:</strong> {stockim.supplier?.name}
                    </p>

                    <p>
                        <strong>Người tạo:</strong> {stockim.user?.name}
                    </p>

                    <p>
                        <strong>Ngày nhập:</strong> {stockim.import_date}
                    </p>

                </div>

                <h3>Danh sách sản phẩm</h3>

                <div className="import-list">

                    {stockim.details?.map((detail) => (
                        <div className="import-card" key={detail.id}>

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
                                {Number(detail.total_price).toLocaleString("vi-VN")} đ
                            </p>

                        </div>
                    ))}

                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/stockimport")}
                >
                    ← Quay lại
                </button>

            </div>
        </>
    )
}
export default DetailImport;