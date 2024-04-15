import { Plugin } from "../../types/plugin";

import { Ready } from "./events/ready";

export const ReadyPlugin: Plugin = {
    config: {
        name: "Ready"
    },
    events: [
        Ready
    ],
    afterLoad: () => {
        console.log("Loaded Ready Plugin")
    }
}