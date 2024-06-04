import React from "react";
import { Image as RNImage } from "react-native";
export default ({ localAsset, width, height }) => {
  return <RNImage source={localAsset} style={{ width, height }} />;
};
