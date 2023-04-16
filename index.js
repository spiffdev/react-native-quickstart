/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

const integrationProduct = "5141150b-8419-4e24-ae3f-9cab47a7920f"; // Sample Serving Board
const workflowID = "3b09df2b-8808-4b1c-955a-d4172e706d11"; // Sample Serving Board Workflow

const AppWrapper = (props) => {
    return (
        <App
            {...{
                ...props,
            }}
        />
    );
};

AppRegistry.registerComponent(appName, () => AppWrapper);
