import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  View,
} from "react-native";
import { Modal } from "react-native";

export default ({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackDrop,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={onPressBackDrop} style={{ flex: 1 }}>
          {/* textInput 담당 view */}
          <SafeAreaView
            style={{
              width: "100%",
              position: "absolute",
              bottom: 0,
            }}
          >
            <TextInput
              placeholder="앨범명을 입력해주세용~~"
              style={{
                width: "100%",
                height: 50,
                padding: 10,
                borderWidth: 0.5,
                borderColor: "lightgrey",
                backgroundColor: "white",
              }}
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus={true}
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
