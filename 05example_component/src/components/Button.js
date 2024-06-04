import { Pressable } from "react-native";

export default ({ onPress, hitSlop, children }) => {
  return (
    <Pressable onPress={onPress} hitSlop={hitSlop}>
      {children}
    </Pressable>
  );
};
