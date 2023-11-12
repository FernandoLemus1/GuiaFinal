<?php
include "conexion.php"; // Incluye tu archivo de conexión a la base de datos

// Supongamos que recibes los datos del equipo por GET
$id_jugador = $_GET['id_jugador'];
$id_equipo = $_GET['id_equipo'];

$carnetEstudiante = $_GET['carnet_estudiante'];
$nombresApellidos = $_GET['nombres_apellidos'];
$fechaNacimiento = $_GET['fecha_nacimiento'];
$genero = $_GET['genero'];
$posicion = $_GET['posicion'];
$numeroCamisa = $_GET['numero_camisa'];

// Realiza la actualización en la base de datos
$sql = "UPDATE jugadores SET
        carnet_estudiante = '$carnetEstudiante',
        nombres_apellidos = '$nombresApellidos',
        fecha_nacimiento = '$fechaNacimiento',
        genero = '$genero',
        posicion = '$posicion',
        id_equipo = '$id_equipo',

        numero_camisa = '$numeroCamisa'
        WHERE id_jugador = $id_jugador";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array('mensaje' => 'Equipo actualizado correctamente.'));
} else {
    echo json_encode(array('error' => 'Error al actualizar equipo: ' . $conn->error));
}

$conn->close();
?>