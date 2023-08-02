import { openai } from "../config/config.js";
const message = async (input, temp, len) => {
    let result;
    let final;
    try {
        result = openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                ...input,
            ],
            temperature: temp,
            max_tokens: len,
        });
        const promise = new Promise((resolve, reject) => {
            // times out request on the server
            setTimeout(() => {
                console.log("timeout");
                reject(new Error("request timeout"));
            }, 29000);
            // times out request on the server
        });
        final = await Promise.race([result, promise]);
        if (final.data.choices) {
            return final === null || final === void 0 ? void 0 : final.data.choices;
        }
        else {
            return final;
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
};
export default message;
