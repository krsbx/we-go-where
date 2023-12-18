import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './navigations';
import LauncherStack from './navigations/LauncherStack';

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer ref={navigationRef}>
        <LauncherStack />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
