import React from "react";
import { View } from "react-native";
import Badge from "./Badge";
import Icons from "./Icons";

export default ({ iconName, visibleBadge }) => {
  if (visibleBadge) {
    return (
      <View>
        <Badge fontSize={10}>
          <Icons name={iconName} size={20} color={"black"} />
        </Badge>
      </View>
    );
  } else {
    return (
      <View>
        <Icons name={iconName} size={20} color={"black"} />
      </View>
    );
  }
};
