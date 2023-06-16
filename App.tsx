/**
 * Sample React Native App
 * @format
 */

import { SpiffCommerceClient, WorkflowExperience } from "@spiffcommerce/core";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

/**
 * This is the main wrapper component for the App editor.
 * See app in src/index.tsx for usage.
 */
const App: React.FunctionComponent<{
    /**
     * The workflow to be used.
     */
    workflowId: string;
    /**
     * The integration product associated to the workflow being run.
     */
    integrationProductId: string;
}> = ({ workflowId, integrationProductId }) => {
    const [workflowExperience, setWorkflowExperience] = useState<WorkflowExperience | undefined>(undefined);
    // This effect handles initialize of the workflow experience when the user first arrives at the page. Loading
    // saved designs will be handled within App separately.
    useEffect(() => {
        const init = async () => {
            // TODO: Core currently does not provide a way to supply a custom storage provider. This should be updated once that is available.
            const client = new SpiffCommerceClient({});
            const experience = await client.getWorkflowExperience(
                workflowId,
                undefined,
                (workflow) => {
                    // TODO: implement a 3D preview service.
                },
                {
                    type: "integration",
                    integrationProductId,
                    workflowId: workflowId,
                },
            );
            // experience.getWorkflowManager().getPreviewService().registerView(canvasRef.current);
            setWorkflowExperience(experience);
        };
        init().then(() => console.log("Workflow Experience Initialized"));
        // We only want this to run when the parameters passed in change. The workflow experience
        // changing internally due to saved designs etc.. Should not trigger this.
    }, [integrationProductId, workflowId]);
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
