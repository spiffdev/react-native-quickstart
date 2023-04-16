/**
 * Sample React Native App
 * @format
 */

import React from "react";
import { Text, View } from "react-native";

/**
 * This is the main wrapper component for the App editor.
 * See app in src/index.tsx for usage.
 */
const App: React.FunctionComponent<{}> = () => {
    return (
        <View
            style={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Welcome to React Native 👋</Text>
        </View>
    );
};

export default App;
