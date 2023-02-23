import {
  Text,
  View,
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import FlatOverview from "../components/FlatOverview";
import logo from "../assets/logo-notext.jpg";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import Swiper from "react-native-swiper";
import plan from "../assets/plan.png";

const RoomScreen = ({ userToken }) => {
  const route = useRoute();
  //   console.log(route.params.id);
  const [item, setItem] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAll, setShowAll] = useState(false);

  const { styles } = useStyle();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${route.params.id}`
        );
        if (response.data) {
          setItem(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.logoSection}>
        <Image source={logo} style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* <FlatOverview item={data} /> */}
        <View
          style={[styles.overview, { height: 300, backgroundColor: "pink" }]}
        >
          {/* {/* <SwiperFlatList
                style={styles.carousel}
                showPagination
                data={item.photos}
                renderItem={({ item }) => ( */}

          {/* )}
              // /> */}
          {/* <Swiper style={styles.carousel}>
                {item.photos.map((photo) => {
                  return <Text>Hello</Text>;
                })}
              </Swiper> */}
          <View>
            <Swiper style={{ height: 200 }} autoplay>
              <Image
                source={{ uri: `${item.photos[0].url}` }}
                style={styles.firstPicture}
                resizeMode="cover"
                strict
              />
              <Image
                source={{ uri: `${item.photos[0].url}` }}
                style={styles.firstPicture}
                resizeMode="cover"
                strict
              />
            </Swiper>
          </View>
          <View style={styles.priceView}>
            <Text style={styles.price}>{item.price} €</Text>
          </View>

          <View style={styles.descriptionOverview}>
            <View style={styles.flatDescription}>
              <View>
                <Text style={styles.flatTitle} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
              <View style={styles.reviewSection}>
                <View>
                  <Text style={styles.starsSection}>
                    <Ionicons
                      name="star-sharp"
                      size={24}
                      color={item.ratingValue > 0 ? "#FFB100" : "grey"}
                    />
                    <Ionicons
                      name="star-sharp"
                      size={24}
                      color={item.ratingValue > 1 ? "#FFB100" : "grey"}
                    />
                    <Ionicons
                      name="star-sharp"
                      size={24}
                      color={item.ratingValue > 2 ? "#FFB100" : "grey"}
                    />
                    <Ionicons
                      name="star-sharp"
                      size={24}
                      color={item.ratingValue > 3 ? "#FFB100" : "grey"}
                    />
                    <Ionicons
                      name="star-sharp"
                      size={24}
                      color={item.ratingValue === 5 ? "#FFB100" : "grey"}
                    />
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "grey" }}>{item.reviews} reviews</Text>
                </View>
              </View>
            </View>

            <Image
              source={{ uri: `${item.user.account.photo.url}` }}
              style={styles.avatar}
            />
          </View>
          <View style={styles.descriptionLong}>
            {!showAll ? (
              <View>
                <Text style={styles.description3Lines} numberOfLines={3}>
                  {item.description}
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
                <Text style={styles.description3Lines}>{item.description}</Text>
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomScreen;

const useStyle = () => {
  const dimensions = useWindowDimensions();
  console.log(dimensions);
  const styles = StyleSheet.create({
    safeAreaView: {
      marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
      // flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    scrollView: {
      // flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    logoSection: {
      width: "100%",
      paddingBottom: 1,
      borderBottomColor: "grey",
      borderBottomWidth: 0.2,
      alignItems: "center",
    },
    logo: {
      height: 75,
      width: 75,
    },
    carousel: { height: dimensions.height * 0.35, width: dimensions.width },
    firstPicture: {
      height: "100%",
      width: "100%",
    },
    priceView: {
      height: 50,
      width: 90,
      backgroundColor: "black",
      alignItems: "center",
      justifyContent: "center",
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      position: "absolute",
      bottom: 20,
    },
    price: { color: "white", fontSize: 20 },
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 50,
    },
    descriptionOverview: {
      width: dimensions.width,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      // backgroundColor: "grey",
      padding: 15,
    },
    flatDescription: {
      flex: 1,
      height: 110,
      justifyContent: "space-evenly",
      // backgroundColor: "pink",
    },
    flatTitle: {
      fontSize: 20,
    },
    reviewSection: {
      flexDirection: "row",
      alignItems: "center",
    },
    starsSection: {
      marginRight: 10,
    },
    descriptionLong: {
      padding: 15,
    },
  });
  return { styles };
};
