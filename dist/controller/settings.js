import configSetting from "../models/setting.js";
import { handleStartText } from "../index.js";
// This applies pre settings of the temperature, maximum length of text and restart text
const settings = (req, res) => {
    const { temperature, length, startText } = req.body;
    handleStartText(startText);
    configSetting(parseInt(temperature), parseInt(length)); // reconfigures the openai api
    res.json({ message: "settings applied successfully", params: { temperature, length, startText } });
};
export default settings;
