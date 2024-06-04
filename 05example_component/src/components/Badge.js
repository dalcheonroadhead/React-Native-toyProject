import { View } from "react-native";
import Typography from "./Typography";

export default ({ children, fontSize }) => {
  return (
    <View>
      <View>
        {children}
        <View
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: "red",
            alignContent: "center",
            justifyContent: "center",
            position: "absolute",
            right: -5,
            top: -5,
          }}
        >
          <Typography fontSize={fontSize} color={"white"}>
            N
          </Typography>
        </View>
      </View>
    </View>
  );
};
