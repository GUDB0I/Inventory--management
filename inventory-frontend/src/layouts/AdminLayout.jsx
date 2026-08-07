import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import "./layout.css";
function AdminLayout() {
    return (
        <div className="layout">
            <Sidebar />

            <div className="main">
                <Header />

                <div className="content">
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default AdminLayout;