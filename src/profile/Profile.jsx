import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.css";

function Profile() {
  const [user, setUser] = useState({ name: "", email: "", phone: "", id: "" });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (loggedInUser) {
      setUser(loggedInUser);
      setNewName(loggedInUser.name);
      setNewEmail(loggedInUser.email);
      setNewPhone(loggedInUser.phone); // Load phone number from localStorage
    }
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!user.id) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const requestBody = {
      name: newName,
      email: newEmail,
      phone: newPhone, // Send updated phone number
    };

    if (newPassword.trim()) {
      requestBody.current_password = currentPassword;
      requestBody.new_password = newPassword;
    }

    console.log("Sending PATCH request with:", requestBody);

    fetch(`http://127.0.0.1:5000/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        if (data.error) {
          throw new Error(data.error);
        }
        alert("Profile updated successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify({ name: newName, email: newEmail, phone: newPhone, id: user.id })
        );

        window.location.reload();
      })
      .catch((error) => {
        console.error("Update error:", error.message);
        alert(error.message || "Something went wrong. Please try again.");
      });
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
      return;
    }

    const token = localStorage.getItem("access_token");

    fetch(`http://127.0.0.1:5000/users/${user.id}`, {  // Correct URL for deleting the user
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        alert("Account deleted successfully!");
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        navigate("/home");
      })
      .catch((error) => {
        console.error("Delete error:", error.message);
        alert(error.message || "Something went wrong. Please try again.");
      });
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleUpdate}>
        <label className="profileLabel">Name: </label><br />
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <label className="profileLabel">Email: </label><br />
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />

        <label className="profileLabel">Phone: </label><br />
        <input
          type="text"
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />

        <label className="profileLabel">Current Password: </label><br />
        <input
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />

        <label className="profileLabel">New Password (optional): </label><br />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        
        <div className="profileButtons">
          <button className="updateProfileBtn" type="submit">Update</button>
          <button
            onClick={handleDelete}
            className="deleteProfileBtn"
            type="button"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
