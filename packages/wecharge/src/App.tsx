import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { navigationRef } from './navigations';

function App() {
  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer ref={navigationRef}>
        <></>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
