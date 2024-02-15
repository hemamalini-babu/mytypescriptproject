// we are going to import controller
import config from '../config/base.config';
//import adminController from '../controller/admin.controller';
import controller from '../controller/categories.controller';
import { getCategoryId, login } from '../utils/helper';

describe('Categories', ()=>{
    let newBrand;
    describe('Fetch Categories',()=>{
        it('GET /categories',async()=>{
            const res= await controller.getCategories();
            expect(res.statusCode).toBe(200);
            expect(res.body.length).toBeGreaterThan(1);//asserting response body length to be greater than 1
            //if we change above value to 100 it wont work as there are only 8 items in body
            //below code for verifiyng property names "id" and "name " of response body
            console.log(res.body[0]);
            expect(Object.keys(res.body[0])).toEqual(['_id','name']);// if you change name to name1 test will fail
        })
       
    });     
    describe('Create Categories',()=>{ 
        let token; 
        beforeAll(async()=>{
            /*const data = {"email":config.email,"password":config.password}
            const res = await adminController.postAdminLogin(data);
            //console.log(res.body);//token is generated , that we should use as authorization to below post call
            token = res.body.token;*/
            //above lines of code can be referred before implementing utilities
           token =  await login(config.email, config.password);
        })
      /*  it('Verify Login',async()=>{
            const data = {"email":"mod@mail.com","password":"Modpass123!"}
            const res = await adminController.postAdminLogin(data);
            //console.log(res.body);//token is generated , that we should use as authorization to below post call
            token = res.body.token;
        })   */
     //create Brand using POST
    it('POST /categories',async()=>{

        const body = {
            "name": "Test Category"+Math.floor(Math.random() * 100000) // generate random number for our name to be unique everytime
            
          }
          const res = await controller.postCategories(body)
          .set("Authorization","Bearer "+token);
          console.log(res);
         expect(res.statusCode).toEqual(200);   
         expect(res.body.name).toEqual(body.name);
  
}); 
});
describe('Update Categories',()=>{
    let token,categoryId; 
        beforeAll(async()=>{
          //  const data = {"email":config.email,"password":config.password}
            //const res = await adminController.postAdminLogin(data);
            //console.log(res.body);//token is generated , that we should use as authorization to below post call
            //token = res.body.token;
            token =  await login(config.email, config.password);
           /* const body = {
                "name": "Test Category"+Math.floor(Math.random() * 100000) // generate random number for our name to be unique everytime
                
              }
               postres = await controller.postCategories(body)
              .set("Authorization","Bearer "+token);*/
              categoryId = await getCategoryId(token);
        })
            
        
       it('PUT /categories/id',async()=>{
        const body = {
            "name": "Test Category Updated "+Math.floor(Math.random() * 100000)
            
          }
          const res = await controller.putCategories(categoryId,body)
            .set("Authorization","Bearer "+token);
            expect(res.statusCode).toEqual(200);
            expect(res.body.name).toEqual(body.name);
       })
});
describe('Delete Categories',()=>{
    let token,categoryId; 
    beforeAll(async()=>{
        //const data = {"email":config.email,"password":config.password}
        //const res = await adminController.postAdminLogin(data);
        //console.log(res.body);//token is generated , that we should use as authorization to below post call
        //token = res.body.token;
        token =  await login(config.email, config.password);
       /* const postbody = {
            "name": "Test Category"+Math.floor(Math.random() * 100000) // generate random number for our name to be unique everytime
            
          }
          const postres = await controller.postCategories(postbody)
          .set("Authorization","Bearer "+token);
          categoryId = postres.body._id;*/
          categoryId = await getCategoryId(token);

    })
    it('DELETE /categories/id',async()=>{
        
          const res = await controller.deleteCategories(categoryId)
            .set("Authorization","Bearer "+token);
            expect(res.statusCode).toEqual(200);
            
       })
});
})