import { index } from "../../services/importservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../components/stockimport.css";
import { index as supp } from "../../services/supplierservice";
import { filter } from "../../services/importservice";

function StockImport() {
    const [supplier, setSuppliers] = useState([]);
    const [supplierId, setSupplierId] = useState("");
    const [indate, setIndate] = useState("");
    const [endate, setEnd] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [stockim, setImport] = useState([]);
    const navigate = useNavigate();

    const getImport = async () => {
        try {
            const response = await index();
            const suppresponse = await supp();
            setSuppliers(suppresponse.data.data);
            setImport(response.data.data);
        } catch (err) {
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getImport();
    }, [])

    const handleFilter = async () => {
        try {
            const res = await filter({
                supplier_id: supplierId,
                start_date: indate,
                end_date: endate
            });

            setImport(res.data.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };
    useEffect(() => {
        handleFilter();
    }, [
        supplierId,
        indate,
        endate
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
            <div className="import-list">
                <div>
                    <Link
                        to="/stockimport/create"
                        className="btn btn-secondary"
                    >
                        + Thêm đơn hàng
                    </Link>
                </div>
                <div className="import-filter">

                    <select
                        value={supplierId}
                        onChange={(e) => setSupplierId(e.target.value)}
                    >
                        <option value="">
                            Tất cả nhà cung cấp
                        </option>

                        {supplier.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={indate}
                        onChange={(e) => setIndate(e.target.value)}
                    />

                    <span>→</span>

                    <input
                        type="date"
                        value={endate}
                        onChange={(e) => setEnd(e.target.value)}
                    />

                </div>
                {stockim.map((item) => (
                    <div className="import-card" key={item.id}>

                        <div className="import-header">
                            <div className="import-id">
                                📦 Phiếu nhập #{item.id}
                            </div>

                            <div className="import-status">
                                Đã nhập
                            </div>
                        </div>

                        <div className="import-body">

                            <div className="info-item">
                                <span>Nhà cung cấp</span>
                                <strong>{item.supplier?.name}</strong>
                            </div>

                            <div className="info-item">
                                <span>Người tạo</span>
                                <strong>{item.user?.name}</strong>
                            </div>

                            <div className="info-item">
                                <span>Ngày nhập</span>
                                <strong>{item.import_date}</strong>
                            </div>

                            <div className="info-item">
                                <span>Mã phiếu</span>
                                <strong>IMP-{item.id}</strong>
                            </div>

                        </div>

                        <div className="import-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate(`/stockimport/show/${item.id}`)}
                            >
                                👁️ Xem chi tiết
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </>
    )

}
export default StockImport;