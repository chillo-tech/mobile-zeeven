import React, { useState, useContext } from 'react';

import { View } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ApplicationContext } from '../context/ApplicationContextProvider';


function DropDown() {
  const { signOut, removeActualEvent  } = useContext(ApplicationContext)
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Menu
        visible={visible}
        anchor={
          <Ionicons 
                    name="ellipsis-vertical-outline" 
                    size={20}
                    onPress={showMenu}
                    style={{paddingRight:15}}
                />
        } 
        onRequestClose={hideMenu}
      >       
        <MenuItem onPress={hideMenu}>Actualiser Liste</MenuItem>
        <MenuDivider />
        <MenuItem onPress={removeActualEvent}>Liste d'evenements</MenuItem>
        <MenuDivider />
        <MenuItem disabled>Disabled item</MenuItem>
        <MenuDivider />
        <MenuItem onPress={signOut}> Déconnecté(e) </MenuItem>
      </Menu>
    </View>
  );
}

export {DropDown}
