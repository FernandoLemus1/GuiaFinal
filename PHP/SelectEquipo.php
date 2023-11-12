<?php
include "conexion.php"; // Incluye tu archivo de conexión a la base de datos

// Realiza la selección en la base de datos
$sql = "SELECT * FROM equipo";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    // Convierte los resultados a un array asociativo
    $equipos = array();
    while($fila = $resultado->fetch_assoc()) {
        $equipos[] = $fila;
    }

    // Devuelve los resultados en formato JSON
    echo json_encode($equipos);
} else {
    echo json_encode(array('mensaje' => 'No se encontraron equipos.'));
}

$conn->close();
?>