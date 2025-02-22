import OpenAI from 'openai';
import { OPEN_API } from "./constant";

const openai = new OpenAI({
    //apiKey: process.env[OPEN_API],
    apiKey: OPEN_API, // This is the default and can be omitted
    dangerouslyAllowBrowser: true
    
});


export default openai;