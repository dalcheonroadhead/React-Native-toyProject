import { Button } from "react-native";
import Icons from "../Icons";

export default ({ onPress, iconName }) => {
  return (
    <Button onPress={onPress}>
      <Icons name={iconName} size={12} />
    </Button>
  );
};
