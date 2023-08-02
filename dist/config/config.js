import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();
export { openai, response };
