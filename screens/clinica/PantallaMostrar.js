import React, { useState } from 'react';
import {  View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
function PantallaMostrar({ route }) {
 
    const { nombre, apellido ,genero,dui,edad,etapa,
      numeroMovil,numeroCasa} = route.params;

      return (
        <View style={styles.container}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.text}>{nombre}</Text>
    
          <Text style={styles.label}>Apellido:</Text>
          <Text style={styles.text}>{apellido}</Text>
    
          <Text style={styles.label}>Género:</Text>
          <Text style={styles.text}>{genero}</Text>
    
          <Text style={styles.label}>Edad:</Text>
          <Text style={styles.text}>{edad}</Text>
    
          <Text style={styles.label}>Etapa:</Text>
          <Text style={styles.text}>{etapa}</Text>
    
          <Text style={styles.label}>DUI:</Text>
          <Text style={styles.text}>{dui}</Text>
    
          <Text style={styles.label}>Número de Teléfono Móvil:</Text>
          <Text style={styles.text}>{numeroMovil}</Text>
    
          <Text style={styles.label}>Número de Teléfono Casa:</Text>
          <Text style={styles.text}>{numeroCasa}</Text>
        </View>
      );
  }
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    text: {
      fontSize: 14,
      marginBottom: 10,
    },
  });
  
  export default PantallaMostrar;