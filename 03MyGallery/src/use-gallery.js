import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  IMAGES: "images",
  ALBUMS: "albums",
};

export const useGallery = () => {
  const [images, setImages] = useState([]); // 화면에 띄울 이미지 리스트들이 저장된 곳
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum); // 지금 선택된 앨범이 뭔지 알려주는 상태변수
  const [albums, setAlbums] = useState([defaultAlbum]); // album 목록 리스트 상태변수 -> defaultAlbum이 들어가 있는 형국
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [bigImgModalVisible, setBigImgModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState(""); // 사용자가 신규 입력한 앨범명이 들어가는 상태변수
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 앨범 List 창 여닫이에 쓰이는 boolean 상태변수
  const [selectedImage, setSelectedImage] = useState(null); // 현재 선택된 이미지가 뭔지 보여주는 상태변수 -> 삭제 혹은 크게 보이기에 사용

  useEffect(() => {
    console.log("이미지 리스트: ", images);
  }, [images]);

  const _setImages = (newImages) => {
    setImages(newImages);
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages));
  };

  const _setAlbums = (newAlbums) => {
    setAlbums(newAlbums);
    AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    // 만약에 취소를 누른게 아니라면
    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id; //id는 1부터 시작하고 배열의 index는 0부터 시작한다. 헷갈리지 말자.
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };

      _setImages([...images, newImage]); // result의 assets의 첫번째 원소값의 uri를 image 값으로 설정 해달라.
    }
  };

  const deleteImage = (imageId) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요!",
      },

      {
        text: "네!",
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          _setImages(newImages);
        },
      },
    ]);
  };

  const openTextInputModal = () => setTextInputModalVisible(true);
  const closeTextInputModal = () => setTextInputModalVisible(false);
  const openBigImgModal = () => setBigImgModalVisible(true);
  const closeBigImgModal = () => setBigImgModalVisible(false);
  const openDropDown = () => setIsDropdownOpen(true);
  const closeDropDown = () => setIsDropdownOpen(false);

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;

    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };

    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId) => {
    Alert.alert("앨범을 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요",
      },

      {
        text: "네!",
        onPress: () => {
          if (albumId === defaultAlbum.id) {
            Alert.alert("기본 앨범은 삭제할 수 없어요!");
            return; //아무것도 반환하지 않는다는 이야기는, onPress가 아무기능도 하지 않은 채 종료된다는 의미
          }
          const newAlbums = albums.filter((album) => {
            return album.id !== albumId;
          });
          _setAlbums(newAlbums);
          selectAlbum(defaultAlbum);
        },
      },
    ]);
  };

  const selectImage = (image) => {
    setSelectedImage(image);
  };

  const filteredImages = images.filter(
    // 현재 선택된 앨범의 사진들만 화면에 보여지도록 filtering 하는 로직
    (image) => image.albumId === selectedAlbum.id
  );

  const moveToPreviousImage = () => {
    // if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex(
      // 현재 선택된 이미지의 id와 같은 이미지의 index를 찾는다.
      (image) => image.id === selectedImage.id
    );
    const previousImageIdx = selectedImageIndex - 1;
    if (previousImageIdx < 0) return;

    // console.log("이전 이미지의 index", previousImageIdx);

    const previousImage = filteredImages[previousImageIdx];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    // if (!selectedImage) return;
    const selectedImageIndex = filteredImages.findIndex((image) => { //선택된 이미지랑 인수로 들어온 이미지가 같을 때, 
      return image.id === selectedImage.id;
    });
    const nextImagesIdx = selectedImageIndex + 1;
    if (nextImagesIdx > filteredImages.length - 1 || nextImagesIdx === -1)
      return;
    const nextImages = filteredImages[nextImagesIdx];
    setSelectedImage(nextImages);
  };

  // boolean 값들
  const showPreviousArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !== 0;
  const showNextArrow =
    filteredImages.findIndex((image) => image.id === selectedImage?.id) !==
    filteredImages.length - 1;

  const resetAlbumTitle = () => {
    setAlbumTitle("");
  };

  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const initValues = async () => {
    // async 함수는 useEffect에 바로 못 쓴다.
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      //null이면 가져와서 넣나마나 소용이 없다.
      const parsedImages = JSON.parse(imagesFromStorage);
      setImages(parsedImages);
    }

    const albumsFromStorage = await AsyncStorage.getItem(ASYNC_KEY.ALBUMS);
    if (albumsFromStorage !== null) {
      const parsedAlbums = JSON.parse(albumsFromStorage);
      setAlbums(parsedAlbums);
    }
  };

  useEffect(() => {
    initValues(); // [ ] 이 비어있으면, 앱 시작할 때 딱 한번 실행되는 것 imagesFromStorage에 저장고에 있는 images란 이미지 리스트 가져온다.
  }, []);

  return {
    imagesWithAddButton,
    pickImage,
    deleteImage,
    selectedAlbum,
    textInputModalVisible,
    openTextInputModal,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropDown,
    closeDropDown,
    albums,
    selectAlbum,
    deleteAlbum,
    bigImgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  };
};
