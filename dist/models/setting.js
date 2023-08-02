import { alterSettings } from "../index.js";
const settings = (temp, maxlength) => {
    alterSettings(temp, maxlength);
    return {
        temperature: temp,
        length: maxlength
    };
};
export default settings;
