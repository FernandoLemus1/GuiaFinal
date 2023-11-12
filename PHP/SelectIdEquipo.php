<?php
include "conexion.php";

// Obtener el ID del equipo desde los parámetros GET
$idEquipo = $_GET['id_equipo'];

// Consulta SQL para obtener los detalles del equipo
$sql = "SELECT * FROM equipo WHERE id_equipo = $idEquipo";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Convertir el resultado a un array asociativo
    $equipo = $result->fetch_assoc();
    echo json_encode($equipo);
} else {
    echo json_encode(array('error' => 'Equipo no encontrado.'));
}

$conn->close();
?>
