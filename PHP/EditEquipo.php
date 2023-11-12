<?php
include "conexion.php"; // Incluye tu archivo de conexión a la base de datos

// Supongamos que recibes los datos del equipo por GET
$idEquipo = $_GET['id_equipo'];
$nombreEquipo = $_GET['nombre_equipo'];
$facultad = $_GET['facultad'];
$anoCicloInscripcion = $_GET['ano_ciclo_inscripcion'];
$torneo = $_GET['torneo'];

// Realiza la actualización en la base de datos
$sql = "UPDATE equipo SET nombre_equipo = '$nombreEquipo', facultad = '$facultad', ano_ciclo_inscripcion = $anoCicloInscripcion, torneo = '$torneo' WHERE id_equipo = $idEquipo";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('mensaje' => 'Equipo actualizado correctamente.'));
} else {
    echo json_encode(array('error' => 'Error al actualizar equipo: ' . $conn->error));
}

$conn->close();
?>