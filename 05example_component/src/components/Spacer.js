import { View } from "react-native";

export default ({ horizontal, space }) => {
  if (horizontal) {
    return <View style={{ marginLeft: space }} />;
  }

  return <View style={{ marginTop: space }} />;
};
