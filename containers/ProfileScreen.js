import { useRoute } from "@react-navigation/core";
import { Text, SafeAreaView } from "react-native";

export default function ProfileScreen() {
  // const { params } = useRoute();
  return (
    <SafeAreaView>
      <Text>Je suis sur la page profil</Text>
      {/* <Text>user id : {params.userId}</Text> */}
    </SafeAreaView>
  );
}
