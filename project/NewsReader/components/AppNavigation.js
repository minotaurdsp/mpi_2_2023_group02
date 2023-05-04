import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import BusinessScreen from '../screens/BusinessScreen'
import WallStreetScreen from '../screens/WallStreetScreen'

const AppNavigation = () => {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="TechCrunch" component={HomeScreen} />
          <Tab.Screen name="US Business" component={BusinessScreen} />
          <Tab.Screen name="Wall Street" component={WallStreetScreen} />
        </Tab.Navigator>
    </NavigationContainer>
    );
  }
export default AppNavigation;