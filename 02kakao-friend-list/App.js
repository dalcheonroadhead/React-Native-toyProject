import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'
import { SafeAreaProvider,SafeAreaView } from 'react-native-safe-area-context';
import { friendProfiles, myProfile } from './src/data';
import Header from './src/Header';
import Margin from './src/Margin';
import Profile from './src/Profile';
import Division from './src/Division';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';
import { useState } from 'react';
import TabBar from './src/TabBar';
const statusBarHeight = getStatusBarHeight(true);
const bottomSpace = getBottomSpace();
import styled from 'styled-components/native';



export default function App() {

  const [isOpened, setIsOpened]=useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    console.log("clicked arrow")
    setIsOpened(!isOpened)
  }

  const ItemSeparatorComponent = () => <Margin height={13}/>
  const renderItem = ({item}) => (
    <View>
    <Profile
    uri={item.uri}
    name={item.name}
    introduction={item.introduction}
    isMe = {false}
    />
  </View>)
  const ListHeaderComponent = () => (    
    <View style={{backgroundColor: "white"}}>
    <Header />
    <Margin height = {10}/>
    <Profile
      uri={myProfile.uri}
      name={myProfile.name}
      introduction={myProfile.introduction}
      isMe = {true}
    />
    <Margin height={15}/>
    <Division/>

    <Margin height={12}/>

    <FriendSection
      friendProfileLen = {friendProfiles.length}
      onPressArrow={onPressArrow}
      isOpened = {isOpened}
    />

    <Margin height={13}/>
  </View>)

  const ListFooterComponent = () => {return <Margin height={10}/>}


  return (
    <View style={styles.container}>
      <FlatList
        data={isOpened ? friendProfiles : []}
        contentContainerStyle = {{paddingHorizontal: 15,}}
        keyExtractor={(_, index) => index}
        ItemSeparatorComponent={ItemSeparatorComponent}
        stickyHeaderIndices={[0]}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator ={false}
      >

      </FlatList>
      <TabBar selectedTabIdx = {selectedTabIdx} setSelectedTabIdx = {setSelectedTabIdx}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: statusBarHeight,
  },
});

