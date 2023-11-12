import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, FlatList, TouchableOpacity,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgUri from "expo-svg-uri";

const IpInfoScreen = () => {
    const [ipAddress, setIpAddress] = useState('');
    const [ipInfo, setIpInfo] = useState([]);
  
    const fetchData = async () => {
      try {
        const storedIpInfo = await AsyncStorage.getItem('ipInfo');
        if (storedIpInfo) {
          setIpInfo(JSON.parse(storedIpInfo));
        }
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    };
  
    const handleFetch = async () => {
      try {
        const response = await fetch(`http://ipwho.is/${ipAddress}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        setIpInfo([...ipInfo, { ...data, timestamp: Date.now() }]);
        await AsyncStorage.setItem('ipInfo', JSON.stringify([...ipInfo, { ...data, timestamp: Date.now() }]));
      } catch (error) {
        console.error('Error fetching IP info:', error);
    
        if (error instanceof SyntaxError) {
          console.error('Invalid JSON in response:', await response.text());
        }
      }
    };
  
    const handleDelete = async (timestamp) => {
      try {
       
        const updatedIpInfo = ipInfo.filter(item => item.timestamp !== timestamp);
        await AsyncStorage.setItem('ipInfo', JSON.stringify(updatedIpInfo));
        setIpInfo(updatedIpInfo);
      } catch (error) {
        console.error('Error deleting IP info:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Ingrese la dirección IP"
          value={ipAddress}
          onChangeText={(text) => setIpAddress(text)}
        />
        <Button title="Consultar" onPress={handleFetch} />
        <FlatList
          data={ipInfo}
          keyExtractor={(item) => item.timestamp.toString()}
          renderItem={({ item }) => (
            <View style={styles.ipInfoContainer}>
               <Text>Tipo de IP: {item.type}</Text>
            <Text>Continente: {item.continent}</Text>
            <Text>Pais: {item.country} {item.flag.emoji}</Text>
            <Text>Código del Pais: {item.country_code}</Text>
            <Text>Region: {item.region}</Text>
            <Text>Ciudad: {item.city}</Text>
            <Text>Capital: {item.capital}</Text>
            <Text>Hora : {item.timezone.utc}</Text>
            <Text>org : {item.connection.org}</Text>
            <Text>Isp : {item.connection.isp}</Text>
            <Text>Domain : {item.connection.domain}</Text>
         

              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.timestamp)}>
                <Text style={styles.deleteButtonText}>Eliminar consulta</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
    ipInfoContainer: {
      marginBottom: 20,
    },
    deleteButton: {
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });

export default IpInfoScreen;
