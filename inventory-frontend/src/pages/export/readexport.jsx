import { index } from "../../services/exportservice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../components/stockimport.css";
import { filter } from "../../services/exportservice";
import { getUsers  } from "../../services/exportservice";

function StockExport() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState([]);
    const [err, setErr] = useState("");
    const [stockex, setExport] = useState([]);
    const [userId, setUserId] = useState("");
    const [indate, setIndate] = useState("");
    const [endate, setEnd] = useState("");
    const navigate = useNavigate();

    const getExport = async () => {
        try {
            const userrepsonse = await getUsers();
            const response = await index();
            setUser(userrepsonse.data.data);
            setExport(response.data.data);
            console.log(userrepsonse.data.data)
        } catch (err) {
            console.log(err.response?.data);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getExport();
    }, []);

    // Search filter
    const handleFilter = async () => {
        try {
            const res = await filter({
                user_id: userId,
                start_date: indate,
                end_date: endate
            });

            setExport(res.data.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    }
    useEffect(() => {
        handleFilter();
    }, [
        userId,
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
                        to="/stockexport/create"
                        className="btn btn-secondary"
                    >
                        + Thêm đơn hàng
                    </Link>
                </div>
                <div>
                    <div className="import-filter">

                        <select
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        >
                            <option value="">
                                Tất cả nhân viên
                            </option>

                            {user.map(items => (
                                <option key={items.id} value={items.id}>
                                    {items.name}
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
                </div>
                {stockex.map((item) => (
                    <div className="import-card" key={item.id}>

                        <div className="import-header">
                            <div className="import-id">
                                📤 Phiếu xuất #{item.id}
                            </div>

                            <div className="import-status">
                                Đã xuất
                            </div>
                        </div>

                        <div className="import-body">

                            <div className="info-item">
                                <span>Người tạo</span>
                                <strong>{item.user?.name}</strong>
                            </div>

                            <div className="info-item">
                                <span>Ngày xuất</span>
                                <strong>{item.export_date}</strong>
                            </div>

                            <div className="info-item">
                                <span>Mã phiếu</span>
                                <strong>EXP-{item.id}</strong>
                            </div>

                        </div>

                        <div className="import-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate(`/stockexport/show/${item.id}`)}
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
export default StockExport;