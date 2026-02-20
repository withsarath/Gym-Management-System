import { useEffect, useState } from "react";
import axios from "axios";

const MembersPage = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMembers(res.data);
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <h2>Members</h2>

      {members.map((m) => (
        <p key={m._id}>{m.email}</p>
      ))}
    </div>
  );
};

export default MembersPage;