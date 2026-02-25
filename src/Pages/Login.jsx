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
            const response = await fetch('http://localhost/trackmyway-api/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                setSuccess('¡Login exitoso! Redirigiendo...');
                // Guardar datos del usuario (opcional)
                localStorage.setItem('user', JSON.stringify(data.user));
                // Redirigir al inicio después de 1 segundo
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
            console.error(err);
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
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success" role="alert">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@correo.com"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn w-100 py-2 mb-3"
                                    style={{
                                        backgroundColor: '#0a2540',
                                        color: 'white',
                                        borderRadius: '30px',
                                        fontWeight: '500',
                                        fontSize: '1.1rem'
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