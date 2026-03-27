import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const Login = () => {
    const { login } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showRegisterAlert, setShowRegisterAlert] = useState(false);

    // Detectar URL del backend automáticamente
    const getApiUrl = () => {
        const hostname = window.location.hostname;
        
        // Si estamos en localhost o 127.0.0.1
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'http://localhost/trackmyway-api';
        }
        
        // Si es una IP (ej: 192.168.x.x) o un dominio
        return `http://${hostname}/trackmyway-api`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const apiUrl = getApiUrl();
        console.log('📤 Conectando a:', `${apiUrl}/login.php`);

        try {
            const response = await fetch(`${apiUrl}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                login(data.user);
                setSuccess('¡Login exitoso! Redirigiendo...');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(`Error de conexión: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        setShowRegisterAlert(true);
        setTimeout(() => setShowRegisterAlert(false), 3000);
    };

    const handleGuestClick = () => {
        const guestUser = {
            id: 'guest_' + Date.now(),
            nombre: 'Visitante',
            email: `guest_${Date.now()}@trackmyway.com`,
            isGuest: true
        };
        login(guestUser);
        localStorage.setItem('isGuest', 'true');
        window.location.href = '/';
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow border-0 rounded-4">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <i className="bi bi-signpost-split" style={{ fontSize: '3rem', color: '#0a2540' }}></i>
                                <h2 className="mt-3" style={{ color: '#0a2540', fontWeight: '600' }}>TrackMyWay</h2>
                                <p className="text-muted">Inicia sesión en tu cuenta</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    <i className="bi bi-check-circle me-2"></i>
                                    {success}
                                </div>
                            )}

                            {showRegisterAlert && (
                                <div className="alert alert-info" role="alert">
                                    <i className="bi bi-info-circle me-2"></i>
                                    🚧 Registro en construcción - Pronto disponible
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg bg-light border-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="test@email.com"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-medium">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg bg-light border-0"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="123456"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-3 mb-3"
                                    style={{
                                        backgroundColor: '#0a2540',
                                        color: 'white',
                                        borderRadius: '30px',
                                        fontWeight: '500',
                                        fontSize: '1.1rem',
                                        border: 'none'
                                    }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Verificando...
                                        </>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
                                </button>

                                {/* Botón continuar como invitado */}
                                <div className="text-center mt-2">
                                    <button 
                                        type="button"
                                        className="btn btn-link text-decoration-none"
                                        style={{ color: '#0a2540' }}
                                        onClick={handleGuestClick}
                                    >
                                        🚪 Continuar como invitado
                                    </button>
                                </div>

                                <div className="text-center mt-3">
                                    <a 
                                        href="#" 
                                        className="text-decoration-none" 
                                        style={{ color: '#0a2540' }}
                                        onClick={handleRegisterClick}
                                    >
                                        ¿No tienes cuenta? Regístrate
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;