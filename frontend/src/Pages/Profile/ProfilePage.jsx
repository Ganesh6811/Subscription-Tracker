import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userDetails, setUserDetails] = useState({});
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("http://localhost:5001/api/auth/check", {
                withCredentials: true,
            });
            console.log("response Data:", res.data);
            setUserDetails(res.data);
        };

        getData();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/auth/logOut", {
                withCredentials: true,
            });

            if (res.status === 200) {
                setIsLoggedOut(true);
                setUserDetails({});
                window.location.reload();
                navigate("/login");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <div className="container">
                <div className="profile-header">
                    <div className="profile-circle">
                        {userDetails.user && userDetails.user.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">
                        <h1 className="name">Name: {userDetails.user}</h1>
                        <h2 className="email">Email: {userDetails.email}</h2>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <div className="content">
                    <h2>Welcome to your profile!</h2>
                    <p>
                        Here you can view your profile details and manage your account.
                    </p>
                </div>
            </div>

            <style>
                {`
                    body {
                        font-family: 'Poppins', sans-serif;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        height: 100vh;
                        margin: 0;
                        color: #fff;
                    }

                    .container {
                        background: rgba(255, 255, 255, 0.9);
                        padding: 30px 40px;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                        width: 350px;
                        animation: slideIn 0.8s ease-out;
                    }

                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }

                    .profile-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px;
                        border-bottom: 1px solid #ddd;
                    }

                    .profile-circle {
                        width: 50px;
                        height: 50px;
                        background-color: #667eea;
                        color: white;
                        font-size: 24px;
                        text-align: center;
                        line-height: 50px;
                        border-radius: 50%;
                    }

                    .user-info {
                        margin-left: 20px;
                    }

                    .name {
                        font-size: 18px;
                        margin-bottom: 5px;
                        color: #555;
                    }

                    .email {
                        font-size: 14px;
                        color: #666;
                    }

                    .logout-button {
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        font-size: 16px;
                        cursor: pointer;
                        transition: background 0.3s ease, transform 0.2s ease;
                        border-radius: 8px;
                    }

                    .logout-button:hover {
                        background: linear-gradient(135deg, #764ba2, #667eea);
                        transform: translateY(-2px);
                    }

                    .logout-button:active {
                        transform: translateY(0);
                    }

                    .content {
                        padding: 20px;
                    }

                    .content h2 {
                        margin-bottom: 10px;
                        color: #555;
                    }

                    .content p {
                        color: #666;
                    }

                    .text-center {
                        text-align: center;
                    }

                    @media (max-width: 480px) {
                        .container {
                            width: 90%;
                            padding: 20px;
                        }

                        .profile-circle {
                            width: 40px;
                            height: 40px;
                            font-size: 20px;
                        }

                        .user-info {
                            margin-left: 10px;
                        }

                        .name {
                            font-size: 16px;
                        }

                        .email {
                            font-size: 12px;
                        }

                        .logout-button {
                            padding: 6px 12px;
                            font-size: 14px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default Profile;
