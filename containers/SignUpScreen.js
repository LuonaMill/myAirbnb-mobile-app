import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Constants from "expo-constants";
import logo from "../assets/logo.png";

// https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("test@mail.com");
  const [username, setUsername] = useState("test");
  const [description, setDescription] = useState("je suis une description");
  const [password, setPassword] = useState("blabla");
  const [confPassword, setConfPassword] = useState("blabla");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      setErrorMessage("");
      if (!email || !username || !description || !password || !confPassword) {
        setErrorMessage("Please fill all fields in");
      }
      if (password !== confPassword) {
        setErrorMessage("Your passwords are not the same");
      }
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );
      if (response.data) {
        console.log(response.data);
        setToken(response.data.token);
        alert("Thanks for signing up");
        navigation.navigate("Tab");
      }
    } catch (error) {
      // 3 - BACK  Vérifier que l'email soit dispo
      // 4 - BACK  Vérifier que le username soit dispo
      const message = error.response.data.error;
      const status = error.response.status;

      if (status === 400) {
        setErrorMessage(message);
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.safeAreaView}>
        <Image source={logo} style={{ height: 100, width: 100 }} />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Sign up</Text>
          <TextInput
            style={styles.input}
            value={email}
            autoCapitalize="none"
            placeholder="email"
            onChangeText={(input) => {
              setEmail(input);
            }}
          />
          <TextInput
            style={styles.input}
            value={username}
            placeholder="username"
            onChangeText={(input) => {
              setUsername(input);
            }}
          />
          <TextInput
            style={[
              styles.input,
              { borderRadius: 10, borderColor: "#ffbac0", borderWidth: 2 },
            ]}
            value={description}
            multiline
            numberOfLines={10}
            placeholder="Describe yourself in a few words"
            onChangeText={(input) => {
              setDescription(input);
            }}
          />
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(input) => {
              setPassword(input);
            }}
          />
          <TextInput
            style={styles.input}
            value={confPassword}
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(input) => {
              setConfPassword(input);
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
            <Text style={styles.btnText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate("SignIn");
            }}
            underlayColor="pink"
          >
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Already have an account ? Sign in !
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
