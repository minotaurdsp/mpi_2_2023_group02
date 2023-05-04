import * as React from 'react';
import { Appbar } from 'react-native-paper';
const Header = () => {
return (
    <Appbar.Header style={{marginTop:20, backgroundColor:'black'}}>
      <Appbar.Content title="Popular"  color='white'/>
    </Appbar.Header>
  );
};
export default Header;