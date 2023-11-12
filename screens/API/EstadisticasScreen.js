import React, { useState, useEffect } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const EstadisticasScreen = () => {
  const [equiposInscritos, setEquiposInscritos] = useState(0);
  const [estudiantesInscritos, setEstudiantesInscritos] = useState(0);
  const [promedioEdad, setPromedioEdad] = useState(0);
  const [tipoTorneo, setTipoTorneo] = useState("Masculino");

  const actualizarEstadisticas = () => {
  
    fetch(`http://192.168.0.18/Guia2/EstadisticasEquipos.php?torneo=${tipoTorneo}`)
      .then((response) => response.json())
      .then((data) => {
        setEquiposInscritos(data.equiposInscritos);
        setEstudiantesInscritos(data.estudiantesInscritos);
        setPromedioEdad(data.promedioEdad);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    
    actualizarEstadisticas();
  }, [tipoTorneo]);

  return (
    <View style={style.contenedor}>
    <View style={style.fila}>
      <Text style={style.etiqueta}>Equipos Inscritos:</Text>
      <Text style={style.dato}>{equiposInscritos}</Text>
    </View>

    <View style={style.fila}>
      <Text style={style.etiqueta}>Estudiantes Inscritos:</Text>
      <Text style={style.dato}>{estudiantesInscritos}</Text>
    </View>

    <View style={style.fila}>
      <Text style={style.etiqueta}>Promedio de Edad por Equipo:</Text>
      <Text style={style.dato}>{promedioEdad}</Text>
    </View>

    <View style={style.fila}>
      <Text style={style.etiqueta}>Filtrar por Tipo de Torneo:</Text>
      <Picker
        style={style.picker}
        selectedValue={tipoTorneo}
        onValueChange={(itemValue) => setTipoTorneo(itemValue)}
      >
        <Picker.Item label="Masculino" value="Masculino" />
        <Picker.Item label="Femenino" value="Femenino" />
      </Picker>
    </View>
  </View>
  );
};
const style = StyleSheet.create({
  contenedor: {
    padding: 20,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  etiqueta: {
    fontSize: 18,
  },
  dato: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    width: 80, 
    textAlign: 'center',  
  },
  picker: {
    borderWidth: 1,
    borderColor: 'black',
    width: 150,  
  },
});

export default EstadisticasScreen;
