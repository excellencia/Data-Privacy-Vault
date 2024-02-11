import client from '../utility/clientConnection.mjs';
import { v4 as uuid } from 'uuid';
import  crypto  from "crypto";


//Encryption key and initialization vector
const encryptionKey = 'NullJahrNullJahrNullJahrNullJahr';
const iv = crypto.randomBytes(16);

/**
 * Tokenizes the provided sensitive data.
 * @param {Object} data - The sensitive data to be tokenized.
 * @returns {Object} - The tokenized data with unique tokenized values for each field.
 */
const tokenize = (data) => {
    const tokenizeResponse = {};
    for(const key in data) {
        const originalValue = data[key];
        //Encrypt the sensitive data
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
        let encryptedValue = cipher.update(originalValue, 'utf-8', 'hex');
        encryptedValue += cipher.final('hex');
        const token = uuid().slice(0,7);
        console.log(`this is redis client ${client.CLIENT_INFO}`);
        client.set(token, encryptedValue);
        console.log(`this is redis client ${client.CLIENT_INFO}`);
        tokenizeResponse[key] = token;
    }
    return tokenizeResponse;
};

/**
 * Detokenizes the provided tokenized data.
 * @param {Object} data - The tokenized data to be detokenized.
 * @returns {Object} - The original sensitive data corresponding to the tokenized data.
 */

const detokenize = async (data) => {
    const detokenizedResponse = {};
    for(const key in data) {
        const token = data[key];
        const storedValue = await client.get(token);
        console.log(`Stored value for the ${token} is ${storedValue}`);
        if(storedValue) {
            // Decrypt the encrypted value
            const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
            let decryptedValue = decipher.update(storedValue, 'hex', 'utf8');
            decryptedValue += decipher.final('utf8');
            console.log(`Decrypted value is ${decryptedValue}`);
            detokenizedResponse[key] = {found:true, value:decryptedValue || " "};
        }
        else{
            detokenizedResponse[key] = { found: false, value: "" };
        }
    }
    return detokenizedResponse;
};

export { tokenize, detokenize };

