import { ORY_PROJECT_URL } from "./environment";
import { Configuration, FrontendApi } from "@ory/client";

const oryConfig = new Configuration({
    basePath: ORY_PROJECT_URL,
    baseOptions: {
      timeout: 4000
    }
});

export const ory = {
    frontend: new FrontendApi(oryConfig)
};