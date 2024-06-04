import React from "react";
import { Text as RNText } from "react-native";
import PropTypes from "prop-types";

const Typography = ({ children, color, fontSize }) => {
  return (
    <RNText style={{ color, fontSize, alignSelf: "center" }}>{children}</RNText>
  );
};

Typography.propTypes = {
  color: PropTypes.string,
  fontSize: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    .isRequired,
};

export default Typography;
