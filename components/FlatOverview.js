import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const FlatOverview = ({ item }) => {
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

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

  return (
    <TouchableOpacity
      style={([styles.overview], { width: width })}
      onPress={() => {
        navigation.navigate("Room", { id: item._id });
        console.log({ item });
      }}
    >
      <View style={styles.pictureOverview}>
        <Image
          source={{ uri: `${item.photos[0].url}` }}
          style={styles.firstPicture}
          resizeMode="cover"
          strict
        />

        <View style={styles.priceView}>
          <Text style={styles.price}>{item.price} €</Text>
        </View>
      </View>
      <View style={styles.descriptionOverview}>
        <View style={styles.flatDescription}>
          <View>
            {/* <Text>Aller vers Room {item._id}</Text> */}

            <Text style={styles.flatTitle} numberOfLines={1}>
              {item.title}
            </Text>
          </View>
          <View style={styles.reviewSection}>
            <Text style={styles.starsSection}>
              {generateStars(item.ratingValue)}
            </Text>

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
    </TouchableOpacity>
  );
};

export default FlatOverview;

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    // width: 470,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // backgroundColor: "pink",
    // padding: 20,
    // margin: 20,
  },
  firstPicture: {
    height: 200,
    width: 400,
    // marginRight: 200,
    // flex: 1,
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "grey",
    rowGap: 30,
    padding: 25,
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
});
