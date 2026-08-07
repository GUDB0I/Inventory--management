import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Logout(){
    const navigate = useNavigate();
    const handleLogout = async()=>{
        try{
            await logout();
        }catch(error){
            console.log(error);
        }
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return(
        <button
            className="btn btn-danger"
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}
export default Logout;