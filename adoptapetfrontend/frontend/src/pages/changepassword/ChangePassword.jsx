import React, { useState } from "react";
import { changePasswordApi } from "../../apis/Api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser || !storedUser.id) {
                toast.error("User ID is missing.");
                setLoading(false);
                return;
            }

            const response = await changePasswordApi({
                userId: storedUser.id,
                oldPassword,
                newPassword,
            });

            const data = response.data;
            if (!data.success) {
                if (data.message.includes("You cannot reuse a recent password. Please choose a new one.")) {
                    toast.warning("You cannot reuse a recent password. Please choose a new one.");
                } else {
                    toast.error(data.message);
                }
            } else {
                toast.success("Password changed successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
        
        setLoading(false);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">Change Password</h2>
                <form onSubmit={handleChangePassword}>
                    <div className="mb-3">
                        <label className="form-label">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Changing..." : "Change Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;