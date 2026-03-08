import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            console.log('Enviando datos:', { email, password }); // Para depurar

            const response = await fetch('http://localhost/trackmyway-api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email, 
                    password: password 
                })
            });

            const data = await response.json();
            console.log('Respuesta del servidor:', data); // Para depurar

            if (data.success) {
                setSuccess('¡Login exitoso! Redirigiendo...');
                localStorage.setItem('user', JSON.stringify(data.user));
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setError(data.message || 'Error al iniciar sesión');
            }
        } catch (err) {
            console.error('Error completo:', err);
            setError('Error de conexión con el servidor');
        } finally {
            setLoading(false);
        }
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

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label fw-medium">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg bg-light border-0"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@correo.com"
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
                                        placeholder="••••••••"
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

                                <div className="text-center">
                                    <a href="/register" className="text-decoration-none" style={{ color: '#0a2540' }}>
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