import { Dimensions, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Spacer from "../Spacer";
import { Header } from "react-native/Libraries/NewAppScreen";
import HeaderTitle from "./HeaderTitle";
import HeaderButton from "./HeaderButton";

const { width } = Dimensions.get("window");

export default ({ children }) => {
  return (
    <SafeAreaInsetsContext>
      {(insets) => (
        <View style={{ paddingTop: insets.top }}>
          <View
            style={{
              width: width,
              flexDirection: "row",
              height: 56,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              alignItems: "center",
            }}
          >
            <Spacer horizontal={true} space={12} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {children}
            </View>
            <Spacer horizontal={true} space={12} />
          </View>
        </View>
      )}
    </SafeAreaInsetsContext>
  );
};
Header.Title = HeaderTitle;
Header.Icon = HeaderButton;
