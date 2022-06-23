import app from '../index';
import supertest from 'supertest';
import { resizeImage } from '../routes/api/api';
import { isNumber } from '../routes/api/api';
import fs from 'fs';

const request = supertest(app);
describe('Testing endpoint responses', () =>{
    it('gets the api endpoint', async () =>{
        const response = await request.get('/api');
        expect(response.status).toBe(200);        
    });

    it('gets the root endpoint', async () =>{
        const response = await request.get('/');
        expect(response.status).toBe(200);        
    });

    it('gets the image endpoint', async () =>{
        const response = await request.get('/api/images?imageName=fjord&height=200&width=200');
        expect(response.status).toBe(200);        
    });

    it('expected to give 400 status code', async () =>{
        const response = await request.get('/api/images?imageName=fjord&height=200&width=asd');
        expect(response.status).toBe(400);        
    });

    it('expected to give 404 status code', async () =>{
        const response = await request.get('/api/images?imageName=asd&height=200&width=200');
        expect(response.status).toBe(404);        
    });
});

describe('General Tests', ()=>{
    it('expected isNumber("5") to be True', ()=>{
        expect(isNumber('5')).toBeTruthy();
    });

    it('expected isNumber("asd") to be True', ()=>{
        expect(isNumber('asd')).toBeFalse();
    }); 

    it('check if image file exists after processing', ()=>{

        const imageLocation:string = '.\\thumps\\200200fjord.jpg';

        if(fs.existsSync(imageLocation)){
            fs.unlinkSync(imageLocation);
        }

        resizeImage('200','200','fjord.jpg');
        
        setTimeout(()=>{
            expect(fs.existsSync(imageLocation)).toBeTrue();
        },100);
        
    }); 

});