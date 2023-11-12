import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';


const IngresarEquiposScreen = () => {
  const [nombreEquipo, setNombreEquipo] = useState('');
  const [facultad, setFacultad] = useState('');
  const [anoCicloInscripcion, setAnoCicloInscripcion] = useState('');
  const [torneo, setTorneo] = useState('Masculino');
  const navigation = useNavigation();
  const handleIngresarEquipo = async () => {
    try {
      const apiUrl = `http://192.168.0.18/Guia2/IngresarEquipo.php?nombre_equipo=${nombreEquipo}&facultad=${facultad}&ano_ciclo_inscripcion=${anoCicloInscripcion}&torneo=${torneo}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.error) {
        console.error('Error al ingresar equipo:', data.error);
      } else {
        console.log('Equipo ingresado correctamente:', data.mensaje);
        navigation.navigate('Equipos');
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View>
      <Text>Ingrese los datos del equipo:</Text>
      <TextInput
        placeholder="Nombre del Equipo"
        value={nombreEquipo}
        onChangeText={(text) => setNombreEquipo(text)}
      />
      <TextInput
        placeholder="Facultad"
        value={facultad}
        onChangeText={(text) => setFacultad(text)}
      />
      <TextInput
        placeholder="Año y Ciclo de Inscripción"
        value={anoCicloInscripcion.toString()}
        onChangeText={(text) => setAnoCicloInscripcion(text)}
      />
        <Text>Torneo:</Text>

     <Picker
          selectedValue={torneo}
          onValueChange={(itemValue, ItemIndex) => setTorneo(itemValue)}
     
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      <Button title="Ingresar Equipo" onPress={handleIngresarEquipo} />
    </View>
  );
};

export default IngresarEquiposScreen;
