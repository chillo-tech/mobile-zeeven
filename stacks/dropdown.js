import React, { useState, useContext } from 'react';

import { View } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApplicationContext } from '../context/ApplicationContextProvider';


function DropDown() {
  const { signOut} = useContext(ApplicationContext)
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        visible={visible}
        anchor={<Ionicons 
                    name="ellipsis-vertical-outline" 
                    size={20}
                    onPress={showMenu}
                    style={{paddingRight:15}}
                />} 
        onRequestClose={hideMenu}
      >       
        <MenuItem onPress={hideMenu}>Actualiser Events</MenuItem>
        <MenuDivider />
        <MenuItem onPress={signOut}>
        
          Sign Out
          </MenuItem>
        <MenuDivider />
        <MenuItem disabled>Disabled item</MenuItem>
      </Menu>
    </View>
  );
}

export {DropDown}
