import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import AuthLoadingScreen from '../Screens/Auth/AuthLoadingScreen';
import AppDrawerNavigator from './DrawerNavigation';
import Welcome from '../Screens/Welcome/Welcome';

const SwitchNavigator = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Welcome: Welcome,
    App: AppDrawerNavigator
})

const appContainer = createAppContainer(SwitchNavigator);

export default appContainer;