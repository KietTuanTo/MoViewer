import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonAppBar from "./Navbar";


export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    removeCookie("token", {path:'/'});
    navigate('/login');
  }

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        removeCookie("token",{path:'/'});
        navigate('/login');
      }

      const { data } = await axios.post(
        "http://localhost:5000/",
        {},
        { withCredentials: true }
      )

      const { status } = data;

      if (status) {
        setLoading(false);
      } else {
        return (removeCookie("token", {path:'/'}), navigate('/login'));
      }
    }
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <>
      <ButtonAppBar isProtected={true} handleLogout={handleLogout}/>
      {loading ? null : children}
    </>
  )
}