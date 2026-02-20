import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/members">Members</Link> |{" "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;