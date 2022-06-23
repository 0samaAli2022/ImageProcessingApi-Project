import express from 'express';
import sharp from 'sharp';
import { appendFile } from 'fs';
import  fs from 'fs';
import { allowedNodeEnvironmentFlags } from 'process';
import logger from '../../utilities/logger';

const routes = express.Router();
const images:string[] = ['encenadaport.jpg', 'fjord.jpg', 'icelandwaterfall.jpg','palmtunnel.jpg','santamonica.jpg'];

routes.get('/',logger,(req,res):any=>{

    var imageName:string = (req.query.imageName as unknown) as string +'.jpg';
    var height:string = (req.query.height as unknown) as string;
    var width:string = (req.query.width as unknown) as string;

    if(!images.includes(imageName)){
        return res.status(404).send('Image name is not found!');
    }else if(!isNumber(height)){
        return res.status(400).send('height is not in correct format!');
    }else if(!isNumber(width)){
        return res.status(400).send('width is not in correct format!');
    }

    const imageLocation:string = `.\\thumps\\${height+width+imageName}`;
        
    if (fs.existsSync(imageLocation)) {
        res.status(200).sendFile(imageLocation,{ root: '.' });
    }else{
        resizeImage(width,height,imageName);
        setTimeout(():void => {res.status(200).sendFile(imageLocation,{ root: '.' });},100);
    }
});

export async function resizeImage(w:string, h:string, name:string):Promise<void> {
    try {
      await sharp(`.\\images\\${name}`)
      .resize({
        width: parseInt(w),
        height: parseInt(h)
      })
      .toFile(`.\\thumps\\${h+w+name}`);
    } catch (error) {
      console.log(error);
    }
  }

export function isNumber(str: string): boolean {
    if (typeof str !== 'string') {
      return false;
    }
  
    if (str.trim() === '') {
      return false;
    }
  
    return !Number.isNaN(Number(str));
  }


export default routes;

