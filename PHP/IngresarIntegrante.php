<?php
include "conexion.php";

$idEquipo = $_GET['id_equipo'];
$integrantes = json_decode($_GET['integrantes'], true);

foreach ($integrantes as $integrante) {
    $carnetEstudiante = $integrante['carnet_estudiante'];
    $nombresApellidos = $integrante['nombres_apellidos'];
    $fechaNacimiento = $integrante['fecha_nacimiento'];
    $genero = $integrante['genero'];
    $posicion = $integrante['posicion'];
    $numeroCamisa = $integrante['numero_camisa'];

    $sql = "INSERT INTO jugadores (id_equipo, carnet_estudiante, nombres_apellidos, fecha_nacimiento, genero, posicion, numero_camisa) VALUES ($idEquipo, '$carnetEstudiante', '$nombresApellidos', '$fechaNacimiento', '$genero', '$posicion', '$numeroCamisa')";

    if ($conn->query($sql) !== TRUE) {
        echo json_encode(array('error' => 'Error al registrar integrante: ' . $conn->error));
        $conn->close();
        exit();
    }
}

echo json_encode(array('mensaje' => 'Integrantes registrados correctamente.'));
$conn->close();
?>