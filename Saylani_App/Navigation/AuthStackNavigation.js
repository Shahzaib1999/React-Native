import React, { Component } from "react";
import { createSwitchNavigator} from 'react-navigation';
import Welcome from "../Screens/Welcome/Welcome";
import AppDrawerNavigator from "./DrawerNavigation";


const AuthStackNavigation = createSwitchNavigator({
    Welcome: Welcome,
    Dashboard: AppDrawerNavigator
},
{
    initialRouteName: "Welcome"
}
);


export default AuthStackNavigation;
