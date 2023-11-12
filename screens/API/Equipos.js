import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity, Alert ,StyleSheet, ScrollView} from 'react-native';
import { useNavigation ,useFocusEffect} from "@react-navigation/native";

const EquiposScreen=()=>{
    const navigation = useNavigation();
    const [equipos, setEquipos] = useState([]);
    useFocusEffect(
      React.useCallback(() => {
        fetchData();
      }, [])
    );
  
    const fetchData = () => {
      const apiUrl = 'http://192.168.0.18/Guia2/SelectEquipo.php';
  
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => setEquipos(data))
        .catch((error) => console.error('Error:', error));
    };
      return(
        
          <ScrollView style={styles.container}>
            <Text style={styles.title}>Lista de Equipos:</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate("IngresarEquipo");
              }}
            >
              <Text style={styles.addButtonText}>Ingresar nuevo Equipo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate("VerIntegrantes");
              }}
            >
              <Text style={styles.addButtonText}>Ver participantes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                navigation.navigate("EstadisticasEquipos");
              }}
            >
              <Text style={styles.addButtonText}>Estadisticas de Equipos</Text>
            </TouchableOpacity>
            <FlatList
              data={equipos}
              keyExtractor={(item) => item.id_equipo.toString()}
              renderItem={({ item }) => (
                <View style={styles.itemContainer}>
                  <Text>Nombre del Equipo: {item.nombre_equipo}</Text>
                  <Text>Facultad: {item.facultad}</Text>
                  <Text>Año de inscripcion: {item.ano_ciclo_inscripcion}</Text>
                  <Text>Torneo: {item.torneo}</Text>


                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("ModificarEquipo", { idEquipo: item.id_equipo });
                    }}
                  >
                    <Text>Modificar Equipo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      navigation.navigate("IngresarIntegrante", { idEquipo: item.id_equipo });
                    }}
                  >
                    <Text>Ingresar Estudiante</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                      Alert.alert(
                        "Eliminar Equipo",
                        "¿Estás seguro de eliminar este equipo?",
                        [
                          {
                            text: "Cancelar",
                            style: "cancel"
                          },
                          {
                            text: "Eliminar",
                            onPress: () => {
                              fetch(`http://192.168.0.18/Guia2/DeleteEquipo.php?id_equipo=${item.id_equipo}`)
                              .then(response => response.json())
                            .then(data => {
                           
                              setEquipos(equipos.filter(equipo => equipo.id_equipo !== item.id_equipo));
                              })
                             .catch(error => console.error('Error:', error));
                            }
                          }
                        ]
                      );
                    }}
                  >
                    <Text style={styles.deleteButtonText}>Eliminar equipo</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        );
      };
      
      const styles = StyleSheet.create({
        container: {
          padding: 20,
        },
        title: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
        },
        addButton: {
          backgroundColor: '#3498db',
          padding: 10,
          borderRadius: 5,
          marginBottom: 10,
        },
        addButtonText: {
          color: '#fff',
          textAlign: 'center',
        },
        itemContainer: {
          marginBottom: 20,
        },
        button: {
          backgroundColor: '#2ecc71',
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
        },
        deleteButton: {
          backgroundColor: '#e74c3c',
          padding: 10,
          borderRadius: 5,
          marginVertical: 5,
        },
        deleteButtonText: {
          color: '#fff',
          textAlign: 'center',
        },
      });
export default EquiposScreen;