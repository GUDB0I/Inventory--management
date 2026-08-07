import Logout from "../components/logout";
function Header() {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="header">
            <h3>Inventory Management</h3>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <label>Xin chào {user?.name}</label>
                <Logout />
            </div>
        </div>
    );
}

export default Header;