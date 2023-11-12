<?php
    include "conexion.php";
    $nombreEquipo = $_GET['nombre_equipo'];
    $facultad = $_GET['facultad'];
    $anoCicloInscripcion = $_GET['ano_ciclo_inscripcion'];
    $torneo = $_GET['torneo'];
    $sql = "INSERT INTO equipo (nombre_equipo, facultad, ano_ciclo_inscripcion, torneo) VALUES ('$nombreEquipo', '$facultad', $anoCicloInscripcion, '$torneo')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(array('mensaje' => 'Equipo registrado correctamente.'));
    } else {
        echo json_encode(array('error' => 'Error al registrar equipo: ' . $conn->error));
    }
    
    $conn->close();
?>