import { Image, Pressable, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useEffect } from "react";

const ArrowButton = ({ iconName, onPress, disabled }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "100%",
      }}
      onPress={onPress}
    >
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? "transparent" : "black"}
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  );
};

export default ({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
  showPreviousArrow,
  showNextArrow,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          // backgroundColor: "lightblue",
          // opacity: 0.5,
          backgroundColor: `rgba(115, 115, 115, 0.5)`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* < 화살표 */}
          {/* showPreviousArrow는 인덱스 값으로 0이 아닐때만 true 이다. 여기선 0인 경우만 안보여주면 되므로 값을 토글했다. */}
          <ArrowButton
            iconName={"arrow-left"}
            onPress={onPressLeftArrow}
            disabled={!showPreviousArrow}
          />

          {/* 이미지 */}
          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{
                width: 280,
                height: 280,
                backgroundColor: "white",
              }}
              resizeMode="contain"
            />
          </Pressable>
          {/* 화살표 > */}
          <ArrowButton
            iconName={"arrow-right"}
            onPress={onPressRightArrow}
            disabled={!showNextArrow}
          />
        </View>
      </Pressable>
    </Modal>
  );
};
