import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import axios from "axios";
import logo from "../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("nono@airbnb-api.com");
  const [password, setPassword] = useState("pass");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      if (!email) {
        setErrorMessage("Your email is missing");
      }
      if (!password) {
        setErrorMessage("We need a password to sign you in");
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email: email, password: password }
      );
      if (response.data) {
        setToken(response.data.token);
        alert(`Thanks for signing in ${response.data.token}`);

        navigation.navigate("SignUp", { token: response.data.token });
      }
    } catch (error) {
      console.log(error.response);
      const message = error.response.data.error;
      const status = error.response.status;

      if (status === 401) {
        setErrorMessage(message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.safeAreaView}>
        <Image source={logo} style={{ height: 100, width: 100 }} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Sign in</Text>

          <TextInput
            style={styles.input}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />

          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
          <Text style={{ textAlign: "center", color: "#FF395B" }}>
            {errorMessage}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>

          <TouchableHighlight
            underlayColor="pink"
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Create an account
            </Text>
          </TouchableHighlight>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  scrollView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    flex: 1,
    margin: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "grey",
  },
  input: {
    borderBottomWidth: 2,
    borderBottomColor: "#ffbac0",
    margin: 20,
    width: 250,
  },

  button: {
    width: 150,
    height: 40,
    borderColor: "#FF395B",
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",

    marginTop: 15,
  },
  btnText: {
    color: "grey",
  },
});
