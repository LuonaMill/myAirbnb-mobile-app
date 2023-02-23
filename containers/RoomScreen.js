import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import plan from "../assets/plan.png";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from "react-native";
import axios from "axios";
import Swiper from "react-native-swiper";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const RoomScreen = () => {
  const route = useRoute();
  const roomId = route.params.id;
  console.log(route);
  const { height, width } = useWindowDimensions();

  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    try {
      const fetchRooms = async () => {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${roomId}`
        );
        // console.log(response.data);
        setRoom(response.data);
        setIsLoading(false);
      };
      fetchRooms();
    } catch (error) {
      console.log(error);
    }
  }, [roomId]);

  const generateStars = (ratingValue) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < ratingValue) {
        starsArray.push(
          <Ionicons name="star-sharp" size={24} color="#FFB100" key={i} />
        );
      } else {
        starsArray.push(
          <Ionicons name="star-sharp" size={24} color="grey" key={i} />
        );
      }
    }
    return starsArray;
  };

  return isLoading === true ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView
      style={{
        marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      }}
    >
      <ScrollView>
        <SwiperFlatList
          style={styles.wrapper}
          showPagination
          data={room.photos}
          renderItem={({ item }) => (
            <ImageBackground
              source={{ uri: item.url }}
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View style={styles.priceView}>
                <Text style={styles.priceText}>{room.price} €</Text>
              </View>
            </ImageBackground>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            padding: 15,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: width * 0.65 }}>
            <Text style={{ fontSize: 20 }} numberOfLines={1}>
              {room.title}
            </Text>

            <Text>{generateStars(room.ratingValue)}</Text>

            <Text style={{ color: "grey" }}>{room.reviews} reviews</Text>
          </View>
          <Image
            source={{ uri: `${room.user.account.photo.url}` }}
            style={styles.avatar}
          />
        </View>
        <View style={{ padding: 15 }}>
          {!showAll ? (
            <View>
              <Text style={styles.description3Lines} numberOfLines={3}>
                {room.description}
              </Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowAll(true);
                }}
              >
                <Text style={{ color: "grey", marginTop: 10 }}>
                  Show More 🔽
                </Text>
              </TouchableWithoutFeedback>
            </View>
          ) : (
            <View>
              <Text style={styles.description3Lines}>{room.description}</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  setShowAll(false);
                }}
              >
                <Text style={{ color: "grey", marginTop: 10 }}>
                  Show Less 🔼
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ height: 300, width: width }}
          showsUserLocation={true}
          initialRegion={{
            latitude: room.location[1],
            longitude: room.location[0],
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker
            coordinate={{
              latitude: room.location[1],
              longitude: room.location[0],
            }}
            title={room.title}
            description={room.description}
          />
        </MapView>
        {/* <Image source={plan} style={{ width: width, height: 300 }} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomScreen;

const styles = StyleSheet.create({
  wrapper: {
    height: 300,
  },
  slide: {
    height: 300,
  },
  priceView: {
    backgroundColor: "black",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  priceText: {
    color: "white",
    fontSize: 20,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
