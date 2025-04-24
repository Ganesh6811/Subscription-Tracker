import axios from "axios";
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import baseUrl from "../../config.js";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };

    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, formData, { withCredentials: true, });
      console.log(res.data);  
      window.location.reload();
      navigate("/");
    }
    catch (error) {
      console.log("Login Falied:", error);
      alert("Login Falied");
    }
  }

  return (
    <>
      <style>
        {
          `
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

h1 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: #fff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

 
form {
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

label {
    font-size: 14px;
    color: #555;
    margin-bottom: 8px;
    display: block;
    font-weight: 500;
}

input[type="text"] {
    width: 100%;
    padding: 12px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 14px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input[type="text"]:focus {
    border-color: #667eea;
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
    outline: none;
}

button[type="submit"] {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: background 0.3s ease, transform 0.2s ease;
}

button[type="submit"]:hover {
    background: linear-gradient(135deg, #764ba2, #667eea);
    transform: translateY(-2px);
}

button[type="submit"]:active {
    transform: translateY(0);
}

 
a {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.3s ease;
}

a:hover {
    color: #ddd;
    text-decoration: underline;
}

 
@media (max-width: 480px) {
    h1 {
        font-size: 2rem;
    }

    form {
        width: 90%;
        padding: 20px;
    }

    input[type="text"] {
        padding: 10px;
    }

    button[type="submit"] {
        padding: 10px;
    }
}`
        }
      </style>
      <h1>Subscription Tracker</h1>

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="text" value={password} onChange={(e) => { setPassword(e.target.value) }} />

        <button type="submit">Login</button>
      </form>

      <Link to="/signUp" >Create Account</Link>
    </>
  );
}
