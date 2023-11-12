<?php
include "conexion.php";
$torneo=$_GET['torneo'];
$sqlEquipos = "SELECT COUNT(*) as equiposInscritos FROM equipo WHERE torneo = '$torneo'";
$resultadoEquipos = $conn->query($sqlEquipos);
$filaEquipos = $resultadoEquipos->fetch_assoc();
$equiposInscritos = $filaEquipos['equiposInscritos'];

$sqlEstudiantes = "SELECT COUNT(*) AS estudiantesInscritos FROM jugadores INNER JOIN equipo ON equipo.id_equipo=jugadores.id_equipo WHERE equipo.torneo='$torneo'";
$resultadoEstudiantes = $conn->query($sqlEstudiantes);
$filaEstudiantes = $resultadoEstudiantes->fetch_assoc();
$estudiantesInscritos = $filaEstudiantes['estudiantesInscritos'];

$sqlEdad = "SELECT COALESCE(ROUND(AVG(YEAR(CURDATE()) - YEAR(jugadores.fecha_nacimiento))), 0) AS promedioEdad FROM jugadores INNER JOIN equipo ON equipo.id_equipo=jugadores.id_equipo WHERE equipo.torneo='$torneo'";
$resultadoEdad = $conn->query($sqlEdad);
$filaEdad = $resultadoEdad->fetch_assoc();
$promedioEdad = $filaEdad['promedioEdad'];

echo json_encode(array(
    'equiposInscritos' => $equiposInscritos,
    'estudiantesInscritos' => $estudiantesInscritos,
    'promedioEdad' => $promedioEdad
));

$conn->close();
?>
