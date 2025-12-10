import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Llamamos al microservicio de Usuarios (Puerto 8081)
            const response = await axios.post('http://localhost:8081/auth/login', {
                email,
                password
            });

            // 2. Si es exitoso, guardamos el token
            const tokenRecibido = response.data.token;
            localStorage.setItem('token', tokenRecibido); // Guardar en el navegador
            setToken(tokenRecibido);
            
            // 3. Redirigir al catálogo
            navigate('/');
            
        } catch (err) {
            setError('Credenciales incorrectas. Intenta de nuevo.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Iniciar Sesión</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Contraseña</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                    />
                                </div>
                                <button type="submit" className="btn btn-success w-100">
                                    Entrar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;