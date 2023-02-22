import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FlatOverview = ({ item }) => {
  return (
    <View style={styles.overview}>
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
    </View>
  );
};

export default FlatOverview;

const styles = StyleSheet.create({
  overview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    // padding: 20,
    // margin: 20,
  },
  firstPicture: {
    height: 200,
    width: 400,
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
    borderRadius: "50%",
  },
  descriptionOverview: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "grey",
    rowGap: 30,
    padding: 5,
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
