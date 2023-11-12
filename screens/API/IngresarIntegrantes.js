import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, Picker, ScrollView } from 'react-native';

const AgregarIntegranteScreen = ({ route }) => {
  const { idEquipo } = route.params;
  const [integrantes, setIntegrantes] = useState([{
    carnet_estudiante: '',
      nombres_apellidos: '',
      fecha_nacimiento: '',
    genero: '',
    posicion: '',
    numero_camisa: '',
    id_equipo: idEquipo
  }]);

  const handleAgregarFormulario = () => {
    setIntegrantes([...integrantes, {
      carnet_estudiante: '',
      nombres_apellidos: '',
      fecha_nacimiento: '',
      genero: '',
      posicion: '',
      numero_camisa: '',
      id_equipo: idEquipo
    
    }]);
  };

  const handleEliminarFormulario = (index) => {
    const nuevosIntegrantes = [...integrantes];
    nuevosIntegrantes.splice(index, 1);
    setIntegrantes(nuevosIntegrantes);
  };

  const handleEnviarIntegrantes = () => {
   
    const ultimoIntegrante = integrantes[integrantes.length - 1];
    if (!Object.values(ultimoIntegrante).some(value => value !== '' && value !== null)) {
      Alert.alert('Error', 'Completa al menos un campo del último integrante.');
      return;
    }


    
    fetch(`http://192.168.0.18/Guia2/IngresarIntegrante.php?id_equipo=${idEquipo}&integrantes=${JSON.stringify(integrantes)}`)
      .then(response => response.json())
      .then(data => {
       
        if (data.mensaje) {
          Alert.alert('Éxito', data.mensaje);
          navigation.navigate('Equipos');
        } else {
          Alert.alert('Error', data.error);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <ScrollView>
      <Text>Agregar Integrante</Text>
      {integrantes.map((integrante, index) => (
        <View key={index}>
          <Text>Nombre y apellido</Text>
          <TextInput
            placeholder="Nombre del Integrante"
            value={integrante.nombres_apellidos}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].nombres_apellidos = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
          <Text>carnet Estudiante</Text>
          <TextInput
            placeholder="Carnet Estudiante"
            value={integrante.carnet_estudiante}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].carnet_estudiante = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
           <Text>Fecha de nacimiento</Text>
          <TextInput
            placeholder="Fecha de nacimiento"
            value={integrante.fecha_nacimiento}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].fecha_nacimiento = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
          <Text>Genero</Text>
          <TextInput
            placeholder="Genero"
            value={integrante.genero}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].genero = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
           <Text>posicion</Text>
          <TextInput
            placeholder="Posicion"
            value={integrante.posicion}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].posicion = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
          <Text>Numero camisa</Text>
          <TextInput
            placeholder="Numero camisa"
            value={integrante.numero_camisa}
            onChangeText={(text) => {
              const nuevosIntegrantes = [...integrantes];
              nuevosIntegrantes[index].numero_camisa = text;
              setIntegrantes(nuevosIntegrantes);
            }}
          />
         
          <Button title="Eliminar Formulario" onPress={() => handleEliminarFormulario(index)} />
        </View>
      ))}
      <Button title="Agregar Nuevo Formulario" onPress={handleAgregarFormulario} />
      <Button title="Enviar Integrantes" onPress={handleEnviarIntegrantes} />
    </ScrollView>
  );
};

export default AgregarIntegranteScreen;

