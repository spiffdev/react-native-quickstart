/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { SpiffCommerceClient, WorkflowExperience } from "@spiffcommerce/core";
import { SpiffCommerce3DPreviewService } from "@spiffcommerce/preview";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Canvas from "react-native-canvas";

// const integrationProduct = "5141150b-8419-4e24-ae3f-9cab47a7920f"; // Sample Serving Board
// const workflowID = "3b09df2b-8808-4b1c-955a-d4172e706d11"; // Sample Serving Board Workflow

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
    const canvasRef = useRef<Canvas>(null);
    const [workflowExperience, setWorkflowExperience] = useState<WorkflowExperience | undefined>(undefined);

    // This effect handles initialize of the workflow experience when the user first arrives at the page. Loading
    // saved designs will be handled within App seperately.
    useEffect(() => {
        if (!canvasRef.current) return;
        const init = async () => {
            const client = new SpiffCommerceClient({});
            await client.initFromIntegrationProduct(integrationProductId);
            const experience = await client.getWorkflowExperience(workflowId, undefined, (workflow) => {
                const canvas = new Canvas({ref:(canvas) => {}});
                return new SpiffCommerce3DPreviewService(canvas as unknown as HTMLCanvasElement, workflow.globalPreviewConfig);
            });
            experience.getWorkflowManager().getPreviewService().registerView(canvasRef.current);
            setWorkflowExperience(experience);
        };
        init().then(() => console.log("Workflow Experience Initialized"));
        // We only want this to run when the parameters passed in change. The workflow experience
        // changing internally due to saved designs etc.. Should not trigger this.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasRef, integrationProductId, workflowId]);

    return (
        <View
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
            }}
        >
            <Canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
            />
        </View>
    );
};

export default App;
