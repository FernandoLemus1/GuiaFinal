<?php
include "conexion.php"; // Incluye tu archivo de conexión a la base de datos

// Supongamos que recibes el ID del equipo por GET
$idEquipo = $_GET['id_equipo'];

// Realiza la eliminación en la base de datos
$sql = "DELETE FROM equipo WHERE id_equipo = $idEquipo";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('mensaje' => 'Equipo eliminado correctamente.'));
} else {
    echo json_encode(array('error' => 'Error al eliminar equipo: ' . $conn->error));
}

$conn->close();
?>
