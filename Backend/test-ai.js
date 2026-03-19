const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const genrateInterviewReport = require('./src/services/ai.service');

async function test() {
    try {
        console.log("Starting generation...");
        const result = await genrateInterviewReport({
            resume: "Software Engineer with 5 years experience in React and Node.js",
            selfdescribe: "I am a hardworking developer.",
            jobdescribe: "Looking for a full stack developer skilled in React, Node, MongoDB."
        });
        console.log("Generation successful! Output keys:", Object.keys(result));
        if(result.technicalQuestions) console.log("technicalQuestions structure ok:", !!result.technicalQuestions[0].question);
        if(result.behavioralQuestions) console.log("behavioralQuestions structure ok:", !!result.behavioralQuestions[0].question);
        if(result.skillGaps) console.log("skillGaps structure ok:", !!result.skillGaps[0].skill);
        if(result.preparationPlan) console.log("preparationPlan structure ok:", !!result.preparationPlan[0].tasks);
        
        console.log(JSON.stringify(result).substring(0, 300) + '...');
        process.exit(0);
    } catch (e) {
        console.error("Error occurred:", e);
        process.exit(1);
    }
}

test();
