import React from "react";
import { View, Text } from 'react-native';

import Settings from "../components/Settings";

const MainView = () => {
    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
            <Settings />
        </View>
    )
}

export default MainView;