import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { useEffect } from 'react';
import theme from '../theme';
import AppContextProvider from '../contexts/AppContext';
import { Provider } from 'react-redux';
import { persistor, store } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

export { ErrorBoundary } from 'expo-router'

export const unstable_settings = {
  initialRouteName: '',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    
    NexaThin: require('../assets/fonts/NexaThin.otf'),
    NexaThinItalic: require('../assets/fonts/NexaThinItalic.otf'),

    NexaLight: require('../assets/fonts/NexaLight.otf'),
    NexaLightItalic: require('../assets/fonts/NexaLightItalic.otf'),

    NexaBook: require('../assets/fonts/NexaBook.otf'),
    NexaBookItalic: require('../assets/fonts/NexaBookItalic.otf'),

    NexaRegular: require('../assets/fonts/NexaRegular.otf'),
    NexaRegularItalic: require('../assets/fonts/NexaRegularItalic.otf'),
    
    NexaBold: require('../assets/fonts/NexaBold.otf'),
    NexaBoldItalic: require('../assets/fonts/NexaBoldItalic.otf'),
    
    NexaHeavy: require('../assets/fonts/NexaHeavy.otf'),
    NexaHeavyItalic: require('../assets/fonts/NexaHeavyItalic.otf'),
    
    NexaXBold: require('../assets/fonts/NexaXBold.otf'),
    NexaXBoldItalic: require('../assets/fonts/NexaXBoldItalic.otf'),
    
    NexaBlack: require('../assets/fonts/NexaBlack.otf'),
    NexaBlackItalic: require('../assets/fonts/NexaBlackItalic.otf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const customTheme = extendTheme(theme)
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={customTheme}>
          <AppContextProvider>
            <Stack screenOptions={{ statusBarColor: "#000" }}>
              <Stack.Screen name="index" options={{ headerShown: false}} />
              <Stack.Screen name="(auth)/register" />
              <Stack.Screen name="(auth)/login" />
            </Stack>
          </AppContextProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
