import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationContextProvider from './context/ApplicationContextProvider';
import RootStack from './stacks/RootStack';



function App() {
  
  return (
    <NavigationContainer>
      <ApplicationContextProvider>
        <RootStack/>
      </ApplicationContextProvider>      
    </NavigationContainer>
  );
}

export default App;