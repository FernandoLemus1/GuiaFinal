import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PrimeraPantalla from "../screens/clinica/PantallaIngreso";
import PantallaMostrar from "../screens/clinica/PantallaMostrar";
import IpInfoScreen from "../screens/IP/ipInfo";
import EquiposScreen from "../screens/API/Equipos";
import IngresarEquiposScreen from "../screens/API/IngresarEquipo";
import ModificarEquipoScreen from "../screens/API/ModificarEquipo";
import AgregarIntegranteScreen from "../screens/API/IngresarIntegrantes";
import IntegrantesScreen from "../screens/API/VerIntegrantes";
import ModificarIntegranteScreen from "../screens/API/ModificarIntegrante";
import EstadisticasScreen from "../screens/API/EstadisticasScreen";
import HomeScreen from "../screens/Entrada";

const Stack=createStackNavigator();
const Navigation=()=>{
        return(
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown:true}}>
                <Stack.Screen name="Homescreen" component={HomeScreen} />

                <Stack.Screen name="EstadisticasEquipos" component={EstadisticasScreen} />

                <Stack.Screen name="VerIntegrantes" component={IntegrantesScreen} />
              
                <Stack.Screen name="Equipos" component={EquiposScreen} />
               
                <Stack.Screen name="ModificarIntegrante" component={ModificarIntegranteScreen} />

                <Stack.Screen name="IngresarIntegrante" component={AgregarIntegranteScreen} />

                <Stack.Screen name="IngresarEquipo" component={IngresarEquiposScreen} />
                <Stack.Screen name="ModificarEquipo" component={ModificarEquipoScreen} />



                     <Stack.Screen name="ipInfo" component={IpInfoScreen} />
                    <Stack.Screen name="PantallaIngreso" component={PrimeraPantalla} />
                    <Stack.Screen name="Mostrar" component={PantallaMostrar} />
                    

                </Stack.Navigator>
            </NavigationContainer>
        )
}
export default Navigation;