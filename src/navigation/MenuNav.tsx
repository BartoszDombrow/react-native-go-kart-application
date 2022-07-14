import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainView from "../screens/MainView";
import HallOfFame from "../screens/HallOfFame";

export type MenuStackParams = {
    Menu: undefined;
    // Start
    HallOfFame: undefined;
    // Statistics
    // Your team
}

const MenuStack = createNativeStackNavigator<MenuStackParams>();

function MenuNav(){
    return (
        <MenuStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Menu"
        >
            <MenuStack.Screen name="Menu" component={MainView}/>
            <MenuStack.Screen name="HallOfFame" component={HallOfFame} />
        </MenuStack.Navigator>
    )
}

export default MenuNav;