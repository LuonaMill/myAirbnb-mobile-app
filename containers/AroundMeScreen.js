import {
  ActivityIndicator,
  SafeAreaView,
  View,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function AroundMeScreen({ setToken }) {
  const [flatsData, setFlatsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [userLatitude, setUserLatidude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const getPermission = async () => {
      try {
        //Je demande la permission à l'utilisateur
        const { status } = await Location.requestForegroundPermissionsAsync();
        // console.log(status);
        if (status === "granted") {
          console.log("On passe à la suite");
          //Ensuite je récupère les coordonnées qd permission accordée
          const location = await Location.getCurrentPositionAsync();
          // console.log(location);
          setUserLatidude(location.coords.latitude);
          setUserLongitude(location.coords.longitude);
          if (userLatitude && userLongitude) {
            console.log(userLongitude);
            const fetchLocations = async () => {
              try {
                const response = await axios.get(
                  `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${userLatitude}&longitude=${userLongitude}`
                );
                setFlatsData(response.data);
                setIsLoading(false);
              } catch (error) {
                console.log(error.response);
              }
            };
            fetchLocations();
          } else {
            console.log()("Nous ne parvenons pas à récupérer les coordonnées");
          }
          // setIsLoading(false);
        } else {
          alert("Permission refusée");
        }
      } catch (error) {
        console.log("Erreur sur l'autorisation de localisation :");
      }
    };
    getPermission();
  }, [userLatitude, userLongitude]);

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <View></View>
      <MapView
        style={{ height: height, width: width }}
        initialRegion={{
          latitude: userLatitude,
          longitude: userLongitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
        provider={PROVIDER_GOOGLE}
      >
        {flatsData.map((marker) => {
          return (
            <Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                navigation.navigate("TabHome", {
                  screen: "Room",
                  params: { id: marker._id },
                });
              }}
            />
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}
