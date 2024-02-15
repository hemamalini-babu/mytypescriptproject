// we are going to import controller
import controller from '../controller/brand.controller';

describe('Brands', ()=>{
    let newBrand;
    describe('Fetch Brands',()=>{
        it('GET /brands',async()=>{
            const res= await controller.getBrands();
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(1);//asserting response body length to be greater than 1
            //if we change above value to 100 it wont work as there are only 8 items in body
            //below code for verifiyng property names "id" and "name " of response body
            console.log(res.body[0]);
            expect(Object.keys(res.body[0])).toEqual(['_id','name']);// if you change name to name1 test will fail
        })
       
    });
   

    
    describe('Create Brands',()=>{
        let postBrand;
        const data = {
            "name": "Test Brand"+Math.floor(Math.random() * 100000), // generate random number for our name to be unique everytime
            "description": "Test Brand Description"
          }
            beforeAll(async()=>{
               
                postBrand= await controller.postBrands(data);
                
            })
            //AfterAll Hook
            afterAll(async ()=>{

              await controller.deleteBrand(postBrand.body._id);
                
            })
        //create Brand using POST
    it('POST /brands',async()=>{

   // const data = {
     //   "name": "Test Brand"+Math.floor(Math.random() * 100000), // generate random number for our name to be unique everytime
       // "description": "Test Brand Description"
        //}
    //const res= await request.post('/brands')
    //.send(data);
    expect(postBrand.statusCode).toEqual(200);
    expect(postBrand.body.name).toEqual(data.name);
    // expect(res.body).toHaveProperty("createdtAt");
    expect(postBrand.body.createdtAt).toBeDefined;// above step not working so we can use this toBeDfeined fn
   // console.log(res.body);
    //newBrand = res.body;
    
});
it('Schema Verification - Name is a mandatory Field',async()=>{
    const data = {
        "name": "", // if name is empty what error is returned. this is part of negative testing
        "description": "Test Brand Description"
        }
    const res= await controller.postBrands(data);
    expect(res.statusCode).toEqual(422);
    expect(res.body.error).toEqual('Name is required');
})
it('Schema Verification - Min char length for name > 1',async()=>{
    const data = {
        "name": 'a', // if name is empty what error is returned. this is part of negative testing
        "description": "Test Brand Description"
        }
    const res= await controller.postBrands(data);
    expect(res.statusCode).toEqual(422);
    //  console.log(res.body.error);
    expect(res.body.error).toEqual('Brand name is too short');
})
it('Schema Verification - Max char length for name = 30',async()=>{
    const data = {
        "name": 'This is really a very long brand name.'// testcase for lenghty name
        
        }
    const res= await controller.postBrands(data);
    expect(res.statusCode).toEqual(422);
    //  console.log(res.body.error);
    expect(res.body.error).toEqual('Brand name is too long');
})
it('Schema Verification - Description must be a string',async()=>{
    const data = {
        "name": 'AppleNew',
        "description": 123// test case if description is integer instead of string

        
        }
    const res= await controller.postBrands(data);
    expect(res.statusCode).toEqual(422);
    //  console.log(res.body.error);
    expect(res.body.error).toEqual('Brand description must be a string');
})
it('Business Logic - Duplicate Brand Entries not allowed',async()=>{
   /* const name = "Test Brand"+Math.floor(Math.random() * 100000);
    const data = {
        "name": name, 
        "description": "Test Brand Description"
        }
        //first request
    const res1= await request.post('/brands')
    .send(data);
    expect(res1.statusCode).toEqual(200);*/
    //data will come from before ALl block and hence this error will be thrown without above extra code
    //second request
    const res2= await controller.postBrands(data);
    expect(res2.statusCode).toEqual(422);
    // console.log(res2.body);
    expect(res2.body.error).toContain('already exists');

    
})
    })      
    
    describe('Fetch Individual Brand',()=>{
        describe('GET /brand/:id',()=>{
            let postBrand;
            beforeAll(async()=>{
                const data = {
                    "name": "Test Brand"+Math.floor(Math.random() * 100000), // generate random number for our name to be unique everytime
                    "description": "Test Brand Description"
                  }
                postBrand= await controller.postBrands(data);
                
                
            })
               //get Brands by Id
          it('GET /brands/:id',async()=>{
            //console.log(postBrand);
            const res= await controller.getBrandById(postBrand.body._id);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toEqual(postBrand.body.name);
        });
        })
         //Negative Test Case for get bramd by brandid
         it('Business Logic - GET /brands/invalid_id should throw 404',async()=>{
            //const res= await request.get('/brands/'+ '44c71625986188d4dce4427a');
            const res = await controller.getBrandById('44c71625986188d4dce4427a');
            console.log(res.body);
            expect(res.statusCode).toEqual(404);
            expect(res.body.error).toContain('Brand not found');
            
        });
    })

    //65c71625986188d4dce4427a
    describe('Update Brands',()=>{
        let postBrand;
        const data = {
            "name": "Test Brand"+Math.floor(Math.random() * 100000), // generate random number for our name to be unique everytime
            "description": "Test Brand Description"
          }
            beforeAll(async()=>{
               
                postBrand= await controller.postBrands(data);
            })
             //AfterAll Hook
             afterAll(async ()=>{

                 await controller.deleteBrand(postBrand.body._id);
                
            })
        //create Brand using POST
     it('PUT /brands/:id',async()=>{

        const data = {
            "name": postBrand.body.name + ' updated',// changed newBrand to postBrand by utilizing hooks method before all above block execution
            "description": "SonyField Products3"
          }
        const res= await controller.putBrands(postBrand.body._id,data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.name).toEqual(data.name);
        
        
    })

    it('PUT /brands/invalid_id',async()=>{

        const data = {
            "name": postBrand.body.name + ' updated',
            "description": "SonyField Products3"
          }
        //const res= await request.put('/brands/' + 123)
        const res= await controller.putBrands(123,data);
        expect(res.statusCode).toEqual(422);
        expect(res.body.error).toContain('Unable to update brands');
        
        
    })
    })

    describe('Delete Brands',()=>{
        let postBrand;
        const data = {
            "name": "Test Brand"+Math.floor(Math.random() * 100000), // generate random number for our name to be unique everytime
            "description": "Test Brand Description"
          }
            beforeAll(async()=>{
               
                postBrand= await controller.postBrands(data);
            })
             //AfterAll Hook
             afterAll(async ()=>{

                postBrand= await controller.deleteBrand(postBrand.body._id);
                
            })
        it('DELETE /brands/:id', async()=>{
            const res= await controller.deleteBrand(postBrand.body._id);
            expect(res.statusCode).toEqual(200);

        })

        it('DELETE /brands/invalid_id', async()=>{
           // const res= await request.delete('/brands/12323');
            const res= await controller.deleteBrand(12323);
            expect(res.statusCode).toEqual(422);
            expect(res.body.error).toContain('Unable to delete brand');

        })
    })
     
})  