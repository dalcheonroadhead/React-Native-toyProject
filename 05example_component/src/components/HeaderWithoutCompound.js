import { Button, Dimensions, View } from "react-native";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import Spacer from "./Spacer";
import Icons from "./Icons";
import Typography from "./Typography";

const { width } = Dimensions.get("window");

export default ({
  leftIcon,
  LonPress,
  Lname,
  title,
  rightIcon,
  RonPress,
  Rname,
}) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets.top }}>
          <View
            style={{
              width: width,
              height: 56,
              flexDirection: "row",
              borderBottomColor: "grey",
              borderBottomWidth: 1,
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
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {leftIcon && (
                  <Button onPress={LonPress}>
                    <Icons name={Lname} size={28} />
                  </Button>
                )}
                <Typography fontSize={18}>{title}</Typography>
              </View>
              {rightIcon && (
                <Button onPress={RonPress}>
                  <Icons name={Rname} size={28} />
                </Button>
              )}
            </View>
            <Spacer horizontal={true} space={12} />
          </View>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};
