const uuid = require('uuid');

//Dictionary to store the tokenise data temporarily in memory
const tokenizedData = {};

/**
 * Tokenizes the provided sensitive data.
 * @param {Object} data - The sensitive data to be tokenized.
 * @returns {Object} - The tokenized data with unique tokenized values for each field.
 */
const tokenize = (data) => {
    const tokenizeResponse = {};
    for(const key in data) {
        const token = uuid.v4().slice(0,7);
        tokenizedData[token] = data[key];
        tokenizeResponse[key] = token;
    }
    console.log(tokenizedData);
    return tokenizeResponse;
};

/**
 * Detokenizes the provided tokenized data.
 * @param {Object} data - The tokenized data to be detokenized.
 * @returns {Object} - The original sensitive data corresponding to the tokenized data.
 */

const detokenize = (data) => {
    const detokenizedResponse = {};
    for(const key in data) {
        const token = data[key];
        if(token in tokenizedData) {
            detokenizedResponse[key] = {found:true, value:tokenizedData[token] || " "};
        }
        else{
            detokenizedResponse[key] = { found: false, value: "" };
        }
    }
    return detokenizedResponse;
};

module.exports = { tokenize, detokenize };

