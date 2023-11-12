import React, { useState } from 'react';
import {  View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

 const PrimeraPantalla=({navigation})=>{
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState('Masculino');
    const [dui, setDui] = useState('');
    const [nit, setNit] = useState('');
    const [numeroMovil, setNumeroMovil] = useState('');
    const [numeroCasa, setNumeroCasa] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');


    const [fechaNacimiento,setFechaNacimiento]=useState('')
    const [direccion, setDireccion] = useState('');
    const validarDUI = () => {
      
      const regexDUI = /^\d{8}-\d{1}$/;
      return regexDUI.test(dui);
    };
    const validarNumeroMovil = () => {
     
      const regexNumeroMovil = /^\d{4}-\d{4}$/;
      return regexNumeroMovil.test(numeroMovil);
    };
    const validarNumeroCasa = () => {
     
      const regexNumeroMovil = /^\d{4}-\d{4}$/;
      return regexNumeroMovil.test(numeroCasa);
    };
    const handleSiguiente=()=>{
        if (nombre === '' || apellido === '') {
            Alert.alert('Campos requeridos', 'Por favor, complete al menos los campos de nombre y apellido.');
            return;
          }
          if (!validarDUI()) {
            Alert.alert('DUI inválido', 'Por favor, ingrese un DUI válido.');
            return;
          }
          
    if (!validarNumeroMovil()) {
      Alert.alert('Número de teléfono móvil inválido', 'Por favor, ingrese un número de teléfono móvil válido.');
      return;
    }
    if (!validarNumeroCasa()) {
      Alert.alert('Número de teléfono casa inválido', 'Por favor, ingrese un número de teléfono móvil válido.');
      return;
    }
         
          const nacimiento = new Date(fechaNacimiento);
          const hoy = new Date();
          const edad = hoy.getFullYear() - nacimiento.getFullYear();
  

    // Determinar la etapa
    let etapa = '';
    if (edad >= 0 && edad <= 5) {
      etapa = 'Primera infancia';
    } else if (edad >= 6 && edad <= 11) {
      etapa = 'Infancia';
    } else if (edad >= 12 && edad <= 18) {
      etapa = 'Adolescencia';
    } else if (edad >= 19 && edad <= 26) {
      etapa = 'Juventud';
    } else if (edad >= 27 && edad <= 59) {
      etapa = 'Adultez';
    } else {
      etapa = 'Persona mayor';
    }
    navigation.navigate('Mostrar', {
        nombre,
        apellido,
        genero,dui,edad,etapa,
        numeroMovil,numeroCasa
       
        
      });
    }
   
    
    return (
      <View style={styles.container}>
        <Text>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
        <Text>Apellido:</Text>
        <TextInput
          style={styles.input}
          value={apellido}
          onChangeText={(text) => setApellido(text)}
        />
        <Text>Genero:</Text>
        <Picker
          selectedValue={genero}
          onValueChange={(itemValue, ItemIndex) => setGenero(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
        <Text>Ingrese su DUI:</Text>
        <TextInput
          style={styles.input}
          value={dui}
          onChangeText={(text) => setDui(text)}
        />
        <Text>Fecha de Nacimiento:</Text>
        <TextInput
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={(text) => setFechaNacimiento(text)}
          placeholder="yyyy-mm-dd"
        />
         <Text>Número de teléfono móvil:</Text>
        <TextInput
          style={styles.input}
          value={numeroMovil}
          onChangeText={(text) => setNumeroMovil(text)}
          placeholder="Numero movil"
        />
        <Text>Número de teléfono casa:</Text>
        <TextInput
          style={styles.input}
          value={numeroCasa}
          onChangeText={(text) => setNumeroCasa(text)}
          placeholder="Número telefono casa"
        />
        <TouchableOpacity style={styles.buttonRegistrarse} onPress={handleSiguiente}>
          <Text style={styles.textBtnRegistrarse}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    picker: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
    },
    buttonRegistrarse: {
      backgroundColor: '#3498db',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    textBtnRegistrarse: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
export default PrimeraPantalla;