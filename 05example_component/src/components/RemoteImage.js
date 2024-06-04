import React from "react";
import { Image as RNImage } from "react-native";

export default ({ uri, width, height }) => {
  return (
    <RNImage
      source={{
        uri: uri,
      }}
      style={{ width, height }}
    />
  );
};
