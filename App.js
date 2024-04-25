import { useState, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import ContainerNavigation from "./src/Screens/ContainerNavigation";
import SplashScreenView from "./src/Component/splashScreenView";
import { UserContextProvider } from "./src/Context/UserContext";
import { UserPhotoContextProvider } from "./src/Context/userPhotoContext";

export default function App() {
  const client = new QueryClient();

  const [isShowSplash, setIsShowSplash] = useState(true);
  const [spinner, setSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinner(false);
      setIsShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isShowSplash ? (
        <SplashScreenView spinner={spinner} />
      ) : (
        <QueryClientProvider client={client}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
              <UserContextProvider>
                <UserPhotoContextProvider>
                  <ContainerNavigation />
                </UserPhotoContextProvider>
              </UserContextProvider>
            </NavigationContainer>
          </GestureHandlerRootView>
        </QueryClientProvider>
      )}
    </>
  );
}

// <StatusBar style="auto" />
