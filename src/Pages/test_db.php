<?php
header("Content-Type: text/html; charset=UTF-8");

echo "<h2>🔍 DIAGNÓSTICO DE CONEXIÓN</h2>";

// 1. Probar conexión a MySQL
echo "<h3>1. Probando conexión a MySQL...</h3>";
$host = 'localhost';
$user = 'root';
$pass = '';
$db = 'trackmyway_db';

$conn = new mysqli($host, $user, $pass);
if ($conn->connect_error) {
    echo "❌ Error conectando a MySQL: " . $conn->connect_error . "<br>";
} else {
    echo "✅ Conexión a MySQL exitosa!<br>";
    
    // 2. Verificar si la base de datos existe
    $result = $conn->query("SHOW DATABASES LIKE '$db'");
    if ($result->num_rows > 0) {
        echo "✅ Base de datos '$db' existe<br>";
        
        // 3. Conectar a la base de datos específica
        $conn->select_db($db);
        
        // 4. Verificar tabla users
        $result = $conn->query("SHOW TABLES LIKE 'users'");
        if ($result->num_rows > 0) {
            echo "✅ Tabla 'users' existe<br>";
            
            // 5. Mostrar usuarios
            $users = $conn->query("SELECT id, email, nombre FROM users");
            echo "<h4>📋 Usuarios en la BD:</h4>";
            echo "<ul>";
            while ($row = $users->fetch_assoc()) {
                echo "<li>ID: {$row['id']} | Email: {$row['email']} | Nombre: {$row['nombre']}</li>";
            }
            echo "</ul>";
        } else {
            echo "❌ Tabla 'users' NO existe<br>";
        }
    } else {
        echo "❌ Base de datos '$db' NO existe<br>";
    }
}

// 5. Probar PDO (que es lo que usa tu login.php)
echo "<h3>2. Probando conexión PDO...</h3>";
try {
    $pdo = new PDO("mysql:host=$host;charset=utf8", $user, $pass);
    echo "✅ Conexión PDO exitosa!<br>";
    
    $pdo->exec("USE $db");
    echo "✅ Base de datos seleccionada<br>";
    
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM users");
    $count = $stmt->fetch(PDO::FETCH_ASSOC);
    echo "✅ Total usuarios: {$count['total']}<br>";
    
} catch(PDOException $e) {
    echo "❌ Error PDO: " . $e->getMessage() . "<br>";
}
?>