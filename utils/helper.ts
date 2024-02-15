import adminController from '../controller/admin.controller';
import categoriesController from '../controller/categories.controller';

export const login = async (email: string, password: string) =>{//we'll start of with export as we would be exporting the function already
    const body = {"email":email,"password":password}
    const res = await adminController.postAdminLogin(body);
    //console.log(res.body);//token is generated , that we should use as authorization to below post call
    return res.body.token;
}

//login('email@mail.com','pass123');

export const getCategoryId = async(token: string)=>{
    const body = {
        "name": "Test Category"+Math.floor(Math.random() * 100000) // generate random number for our name to be unique everytime
        
      }
      const res = await categoriesController.postCategories(body)
      .set("Authorization","Bearer "+token);
      return res.body._id;
}
