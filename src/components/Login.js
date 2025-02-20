import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const toast = React.useRef(null);
    const navigate = useNavigate();


    const resetScreen = () => {
        setUsername("");
        setPassword("");
        setSubmitted(false);


    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (!username || !password) {
            if (toast.current) {
                toast.current.show({
                    severity: "error",
                    summary: "Login Failed",
                    detail: "Both username and password are required.",
                    life: 3000,
                });
            }
            return;
        }

        try {
            const response = await dispatch(loginUser({ username, password })).unwrap();
            if (toast.current) {
                localStorage.setItem("userData", JSON.stringify(response));

                toast.current.show({
                    severity: "success",
                    summary: "Login Successful",
                    detail: "You have logged in successfully!",
                    life: 3000,
                });
            }

            navigate("/Home");
            resetScreen();

        } catch (err) {
            if (toast.current) {
                toast.current.show({
                    severity: "error",
                    summary: "Login Failed",
                    detail: error || "Invalid username or password.",
                    life: 3000,
                });
            }
        }
    };




    return (
        <div
            className="p-d-flex p-jc-center p-ai-center"
            style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "#f4f4f9",
                alignItems: "center",
            }}
        >
            <Card
                title="Login"
                style={{
                    width: "350px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    padding: "2rem",
                    backgroundColor: "#ffffff",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-field" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="username" style={{ fontWeight: "bold", color: "#555" }}>
                            Username
                        </label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoFocus
                            style={{ width: "100%", marginTop: "0.5rem" }}
                            className={submitted && !username ? "p-invalid" : ""}
                        />
                        {submitted && !username && (
                            <small className="p-error" style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                                Username is required.
                            </small>
                        )}
                    </div>

                    <div className="p-field" style={{ marginBottom: "1rem" }}>
                        <label htmlFor="password" style={{ fontWeight: "bold", color: "#555" }}>
                            Password
                        </label>
                        <Password
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            toggleMask
                            style={{ width: "100%", marginTop: "0.5rem" }}
                            className={submitted && !password ? "p-invalid" : ""}
                        />
                        {submitted && !password && (
                            <small className="p-error" style={{ color: "#e74c3c", fontSize: "0.8rem" }}>
                                Password is required.
                            </small>
                        )}
                    </div>

                    <Button
                        label={loading ? "Loading..." : "Login"}
                        type="submit"
                        style={{
                            width: "100%",
                            backgroundColor: "#4caf50",
                            borderColor: "#4caf50",
                            color: "white",
                            marginTop: "1.5rem",
                        }}
                        className="p-button"
                        disabled={loading}
                    />
                </form>
            </Card>

            <Toast ref={toast} />
        </div>
    );
};

export default Login;
