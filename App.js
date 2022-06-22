import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationContextProvider from './context/ApplicationContextProvider';
import RootStack from './stacks/RootStack';
import SecurityContextProvider from './context/SecurityContextProvider';


function App() {
  
  return (
    <NavigationContainer>
      <ApplicationContextProvider>
        <SecurityContextProvider>
          <RootStack/>
        </SecurityContextProvider>
      </ApplicationContextProvider>      
    </NavigationContainer>
  );
}

export default App;