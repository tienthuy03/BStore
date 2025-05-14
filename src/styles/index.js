import { Dimensions, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const home = StyleSheet.create({

  linearGradient: {
    height: 120,
    flexDirection: "column",
  },

  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 3,
    position: "absolute",
    top: -30,
  },
  over: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height / 3,
    position: "absolute",
    top: -1
  },
  boxI: {
    width: 60,
    height: 60,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imgNo: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: Colors.white
  },
  image: {
    width: 160,
    height: 25,
  },
  itemContainer: {
    width: 350,
    height: 200,
    borderRadius: 10,
    alignSelf: "center",
    marginRight: 20,
    marginLeft: 20,
    resizeMode: "cover",
  },
});
