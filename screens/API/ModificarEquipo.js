import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRoute,useNavigation } from '@react-navigation/native';

const ModificarEquipoScreen = () => {
  const route = useRoute();
  const [equipo, setEquipo] = useState({});
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaFacultad, setNuevaFacultad] = useState('');
  const [nuevoAnoCicloInscripcion, setNuevoAnoCicloInscripcion] = useState('');
  const [nuevoTorneo, setNuevoTorneo] = useState('');
  const navigation = useNavigation();


  useEffect(() => {
  
    const { idEquipo } = route.params;

   
    fetch(`http://192.168.0.18/Guia2/SelectIdEquipo.php?id_equipo=${idEquipo}`)
      .then(response => response.json())
      .then(data => setEquipo(data))
      .catch(error => console.error('Error:', error));
  }, [route.params]);

  const handleModificarEquipo = () => {
    const nuevoEquipo = {
        ...equipo,
        nombre_equipo: nuevoNombre || equipo.nombre_equipo,
        facultad: nuevaFacultad || equipo.facultad,
        ano_ciclo_inscripcion: nuevoAnoCicloInscripcion || equipo.ano_ciclo_inscripcion,
        torneo: nuevoTorneo || equipo.torneo,
      };
    fetch(`http://192.168.0.18/Guia2/EditEquipo.php?id_equipo=${equipo.id_equipo}&nombre_equipo=${nuevoEquipo.nombre_equipo}&facultad=${nuevoEquipo.facultad}&ano_ciclo_inscripcion=${nuevoEquipo.ano_ciclo_inscripcion}&torneo=${nuevoEquipo.torneo}`, {
      method: 'PUT', 
    })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('Equipos');

        console.log('Equipo modificado:', data);
       
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <View>
      <Text>Modificar Equipo</Text>
      <Text>Nombre del equipo: {equipo.nombre_equipo}</Text>
    <TextInput
      placeholder="Nuevo nombre del equipo"
      value={nuevoNombre}
      onChangeText={text => setNuevoNombre(text)}
    />

    <Text>Facultad: {equipo.facultad}</Text>
    <TextInput
      placeholder="Nueva facultad"
      value={nuevaFacultad}
      onChangeText={text => setNuevaFacultad(text)}
    />

    <Text>Año y ciclo de inscripción: {equipo.ano_ciclo_inscripcion}</Text>
    <TextInput
      placeholder="Nuevo año y ciclo de inscripción"
      value={nuevoAnoCicloInscripcion}
      onChangeText={text => setNuevoAnoCicloInscripcion(text.toString())}
    />

    <Text>Torneo: {equipo.torneo}</Text>
    <TextInput
      placeholder="Nuevo torneo"
      value={nuevoTorneo}
      onChangeText={text => setNuevoTorneo(text)}
    />
      <Button title="Modificar Equipo" onPress={handleModificarEquipo} />
    </View>
  );
};

export default ModificarEquipoScreen;