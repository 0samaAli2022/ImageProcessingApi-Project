import express from 'express';

const logger = (req:express.Request, res:express.Response, next:Function): void => {
    console.log(`user requested access to ${req.query.imageName} with height ${req.query.height} and width ${req.query.width}`);
    next();
}

export default logger;