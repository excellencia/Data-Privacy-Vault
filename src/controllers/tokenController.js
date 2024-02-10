const { tokenize, detokenize } = require('../services/tokenService');

const tokenizeHandler = (req, res) => {
    try{
        const {id, data} = req.body;

        if(!id || !data) {
            res.status(400).json({error: "Invalid request paylod"});
        }
    
        const tokenizedData = tokenize(data);
    
        res.status(201).json({id, data: tokenizedData});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
};

const detokenizeHandler = (req, res) => {
    try{
        const{id, data} = req.body;

        if(!id || !data) {
            res.status(400).json({error: "Invalid request payload"});
        }

        const detokenizedData = detokenize(data);
        res.status(200).json({id, data: detokenizedData});
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
};

module.exports = {tokenizeHandler, detokenizeHandler};