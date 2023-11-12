import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet, TextInput, Button, Image, FlatList, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation ,useFocusEffect} from "@react-navigation/native";

const IntegrantesScreen=()=>{
    const navigation = useNavigation();
    const [equipos, setEquipos] = useState([]);
    useFocusEffect(
      React.useCallback(() => {
        fetchData();
      }, [])
    );
      const fetchData = () => {
        const apiUrl = 'http://192.168.0.18/Guia2/SelectIntegrantes.php';
    
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => setEquipos(data))
          .catch((error) => console.error('Error:', error));
      };
      return (
        <ScrollView style={Estilos.contenedor}>
          <Text style={Estilos.texto}>Lista de participantes:</Text>
    
          <FlatList
            data={equipos}
            keyExtractor={(item) => item.id_jugador.toString()}
            renderItem={({ item }) => (
              <View>
                <Text style={Estilos.texto}>Nombre del integrante: {item.nombres_apellidos}</Text>
                <Text style={Estilos.texto}>Carnet: {item.carnet_estudiante}</Text>
                <Text style={Estilos.texto}>Genero: {item.genero}</Text>
                <Text style={Estilos.texto}>Posicion: {item.posicion}</Text>
                <Text style={Estilos.texto}>numero camisa: {item.numero_camisa}</Text>


                <TouchableOpacity
                  style={Estilos.boton}
                  onPress={() => {
                    navigation.navigate("ModificarIntegrante", { id_jugador: item.id_jugador });
                  }}
                >
                  <Text style={{ color: 'white' }}>Modificar Integrante</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                  style={Estilos.boton}
                  onPress={() => {
                    Alert.alert(
                      "Eliminar Equipo",
                      "¿Estás seguro de eliminar este Jugador?",
                      [
                        {
                          text: "Cancelar",
                          style: "cancel"
                        },
                        {
                          text: "Eliminar",
                          onPress: () => {
                            fetch(`http://192.168.0.18/Guia2/DeleteJugador.php?id_jugador=${item.id_jugador}`)
                              .then(response => response.json())
                              .then(data => {
                                setEquipos(equipos.filter(equipo => equipo.id_jugador !== item.id_jugador));
                              })
                              .catch(error => console.error('Error:', error));
                          }
                        }
                      ]
                    );
                  }}
                >
                  <Text style={{ color: 'white' }}>Eliminar Integrante</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>
      );
 
}
const Estilos = StyleSheet.create({
  contenedor: {
    padding: 20,
  },
  texto: {
    fontSize: 18,
    marginBottom: 10,
  },
  boton: {
    padding: 10,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 5,
    marginVertical: 5,
  },
});
export default IntegrantesScreen;