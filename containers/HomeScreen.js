import { useNavigation } from "@react-navigation/core";
import {
  Button,
  FlatList,
  Image,
  Platform,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import logo from "../assets/logo-notext.jpg";
import Constants from "expo-constants";
import FlatOverview from "../components/FlatOverview";

//!INFOS
// URL: https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms
// Method: GET

export default function HomeScreen({ userToken }) {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        if (response.data) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response.data);
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
      {/* <ScrollView contentContainerStyle={styles.scrollView}> */}
      {/* <View> */}
      <FlatList
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <FlatOverview item={item} userToken={userToken} />
        )}
      />
      {/* </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
    // flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  // scrollView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
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
});
