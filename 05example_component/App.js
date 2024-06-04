import { View } from "react-native";
import TabIcon from "./src/components/TabIcon";
import useComponents from "./src/components/useComponents";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HeaderWithoutCompound from "./src/components/HeaderWithoutCompound";
import Header from "./src/components/Header/Header";

export default function App() {
  const { visibleBadge } = useComponents();
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }}>
        {/* <HeaderWithoutCompound title="HEADER" /> */}
        <Header>
          <Header.Title title="HEADER"></Header.Title>
        </Header>
      </View>
    </SafeAreaProvider>
  );
}
