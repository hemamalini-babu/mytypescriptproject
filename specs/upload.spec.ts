// we are going to import controller
import config from '../config/base.config';
import uploadController from '../controller/upload.controller';

describe('Upload File', ()=>{
    it('POST /upload/single',async()=>{
        const res= await uploadController.postUploadSingle('data\\Best-Beautiful-Images-For-Desktop-Nature.png');
       // console.log(res.body);
        expect(res.body.filename).toEqual('Best-Beautiful-Images-For-Desktop-Nature.png');
    })
    it.only('POST /upload/multiple',async()=>{
        const files=['data\\Best-Beautiful-Images-For-Desktop-Nature.png','data\\flowers-background-butterflies-beautiful-87452.webp'];
        const res= await uploadController.postUploadMultiple(files);
      // console.log(res.body);
      expect(res.body.length).toEqual(files.length);
        expect(res.body[0].filename).toEqual('Best-Beautiful-Images-For-Desktop-Nature.png');
        expect(res.body[1].filename).toEqual('flowers-background-butterflies-beautiful-87452.webp');
    })
    
})
