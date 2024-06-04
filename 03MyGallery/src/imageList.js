import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";

const width = Dimensions.get("screen").width; // 스크린의 width를 가져와라
const minColumnSize = width >= 500 ? 200 : 130;
const divisor = width / minColumnSize;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

console.log("width", width);
console.log("minColumnSize", minColumnSize);
console.log("divisor", divisor);
console.log("numColumns", numColumns);
console.log("columnSize", columnSize);

export default ({
  imagesWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPressImage,
}) => {
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          key={`index - ${index}`}
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "200", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPressImage(id)}
      >
        <Image
          source={{ uri: uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={imagesWithAddButton}
      renderItem={renderItem}
      numColumns={numColumns}
      style={{ zIndex: -1 }}
      onLayout={(e) => {
        console.log("e.nativeEvent.layout.width", e.nativeEvent.layout.width);
      }}
    />
  );
};
