import { useEffect, useState } from "react";
import "../components/dashboard.css";
import { index } from "../services/dashboard";

function Dashboard() {

    const [user, setUser] = useState(null);
    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);

        const getDashboard = async () => {
            try {

                const response = await index();

                setDashboard(response.data.data);

            } catch (error) {
                console.log(error);
            }
        };

        getDashboard();

    }, []);

    if (!dashboard) {
        return <h2 class="supplier-loading"> Loading...</h2>;
    }

    return (
        <div className="dashboard">

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h3>Tổng sản phẩm</h3>
                    <span>{dashboard.total_products}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Tổng danh mục</h3>
                    <span>{dashboard.total_categories}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Nhà cung cấp</h3>
                    <span>{dashboard.total_suppliers}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Phiếu nhập</h3>
                    <span>{dashboard.total_imports}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Phiếu xuất</h3>
                    <span>{dashboard.total_exports}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Tổng tồn kho</h3>
                    <span>{dashboard.total_stock}</span>
                </div>

                <div className="dashboard-card">
                    <h3>Tổng tiền nhập</h3>
                    <span>
                        {Number(dashboard.total_import_amount).toLocaleString()} đ
                    </span>
                </div>

                <div className="dashboard-card">
                    <h3>Tổng tiền xuất</h3>
                    <span>
                        {Number(dashboard.total_export_amount).toLocaleString()} đ
                    </span>
                </div>

            </div>

            <div className="dashboard-table">

                <h2>Sản phẩm sắp hết hàng</h2>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Tên sản phẩm</th>

                            <th>Tồn kho</th>

                        </tr>

                    </thead>

                    <tbody>

                        {dashboard.low_stock_products.length > 0 ? (

                            dashboard.low_stock_products.map((item) => (

                                <tr key={item.id}>

                                    <td>{item.id}</td>

                                    <td>{item.name}</td>

                                    <td>{item.stock}</td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td colSpan="3">
                                    Không có sản phẩm sắp hết.
                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default Dashboard;