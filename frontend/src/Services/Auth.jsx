import axios from "axios"; 

export const AuthUser = async () => {
    try {
        const res = await axios.get("http://localhost:5001/api/auth/check", {
            withCredentials: true,
        });

        if (res.status === 200) {
            return { check: true, userId: res.data.user }; 
        }
    } catch (error) {
        console.error("Error in Auth service:", error);
    }

    return { check: false, userId: null};
};


