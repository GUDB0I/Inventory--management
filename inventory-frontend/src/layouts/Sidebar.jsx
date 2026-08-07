import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Inventory</h2>

            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/category">Category</Link>
                </li>

                <li>
                    <Link to="/supplier">Supplier</Link>
                </li>

                <li>
                    <Link to="/product">Product</Link>
                </li>

                <li>
                    <Link to="/stockimport">Import</Link>
                </li>

                <li>
                    <Link to="/stockexport">Export</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;