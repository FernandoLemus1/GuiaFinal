import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useRoute ,useNavigation} from '@react-navigation/native';

const ModificarIntegranteScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const [integrante, setIntegrante] = useState({});
  const [nuevoCarnet, setNuevoCarnet] = useState('');
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaFechaNacimiento, setNuevaFechaNacimiento] = useState('');
  const [nuevoGenero, setNuevoGenero] = useState('');
  const [nuevaPosicion, setNuevaPosicion] = useState('');
  const [nuevoNumeroCamisa, setNuevoNumeroCamisa] = useState('');

  useEffect(() => {
    const { id_jugador } = route.params;

    fetch(`http://192.168.0.18/Guia2/SelectIdJugador.php?id_jugador=${id_jugador}`)
      .then(response => response.json())
      .then(data => setIntegrante(data))
      .catch(error => console.error('Error:', error));
  }, [route.params]);

  const handleModificarEquipo = () => {
    const nuevoIntegrante = {
      ...integrante,
      carnet_estudiante: nuevoCarnet || integrante.carnet_estudiante,
      nombres_apellidos: nuevoNombre || integrante.nombres_apellidos,
      fecha_nacimiento: nuevaFechaNacimiento || integrante.fecha_nacimiento,
      genero: nuevoGenero || integrante.genero,
      posicion: nuevaPosicion || integrante.posicion,
      numero_camisa: nuevoNumeroCamisa || integrante.numero_camisa,
    };
    fetch(`http://192.168.0.18/Guia2/EditJugador.php?id_jugador=${integrante.id_jugador}&nombres_apellidos=${nuevoIntegrante.nombres_apellidos}&id_equipo=${nuevoIntegrante.id_equipo}&carnet_estudiante=${nuevoIntegrante.carnet_estudiante}&genero=${nuevoIntegrante.genero}&posicion=${nuevoIntegrante.posicion}&fecha_nacimiento=${nuevoIntegrante.fecha_nacimiento}&numero_camisa=${nuevoIntegrante.numero_camisa}`, {
      method: 'PUT', 
    })
      .then(response => response.json())
      .then(data => {
        navigation.navigate('VerIntegrantes');
      
       
      })
      .catch(error => console.error('Error:', error));
   
  };

  return (
    <View>
      <Text>Modificar Integrante</Text>
      <Text>Nombre del Integrante: {integrante.nombres_apellidos}</Text>
      <TextInput
        placeholder="Nuevo nombre del integrante"
        value={nuevoNombre}
        onChangeText={text => setNuevoNombre(text)}
      />

      <Text>Carnet: {integrante.carnet_estudiante}</Text>
      <TextInput
        placeholder="Nuevo carnet"
        value={nuevoCarnet}
        onChangeText={text => setNuevoCarnet(text)}
      />

      <Text>Fecha de nacimiento: {integrante.fecha_nacimiento}</Text>
      <TextInput
        placeholder="Nueva fecha de nacimiento"
        value={nuevaFechaNacimiento}
        onChangeText={text => setNuevaFechaNacimiento(text)}
      />

      <Text>Posición: {integrante.posicion}</Text>
      <TextInput
        placeholder="Nueva posición"
        value={nuevaPosicion}
        onChangeText={text => setNuevaPosicion(text)}
      />

      <Button title="Modificar Integrante" onPress={handleModificarEquipo} />
    </View>
  );
};

export default ModificarIntegranteScreen;
