<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "torneo";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
    echo('Conexion fallida');
}
?>