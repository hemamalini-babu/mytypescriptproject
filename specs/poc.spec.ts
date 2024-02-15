import * as supertest from 'supertest';
//const supertest = require('supertest');// old method of declaration - not needed
const request = supertest('https://jsonplaceholder.typicode.com/');
describe('POC Tests',()=>{

    describe('GET requests', ()=>{
        //below is where we are going to start writing test
    it('GET /posts',async()=>{
        const res = await request.get('/posts');// response we get after making get request call
        //anything in JS is asynchronous call, so we add 'await' keyword above and change fn to async
       // console.log(res);// print response in console o/p
        //assertions below to check testcases
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1);
    })
    //get with query parameters
    it('GET /comments with query params', async()=>{
//        const res= await request.get('/comments?postId=1')// we can directly add query params in this request url
    const res= await request
    .get('/comments')
    .query({postId: 1, limit: 10});// multiple query params can be separated by comma
    console.log(res);

        expect(res.body[0].postId).toBe(1);
        //other method is below

    })
    })

    //POST method below
    describe('POST requests',()=>{
      
        it('POST /posts',async()=>{// it.only will run only that partciular test
            const data ={
                "title":"My Fav animes",
                "body": "Anime Name",
                "userId": 1
            }
            const res = await request
            .post("/posts")
            .send(data);
            //console.log(res.body);
            expect(res.body.title).toBe(data.title);// if some random text is added test will fail
        })
    })

    //PUT method below
    describe('PUT requests',()=>{
        it('PUT /posts/{id}', async()=>{
            const data ={
                "title":"Updated Title",
                "body": "New Anime Name",
                "userId": 5
            }
            //before state of response before put operation
            const getRes =request
            .get("/posts/1");
            const beforeTitle = (await getRes).body.title;
            console.log(beforeTitle);
            const res = await request
            .put("/posts/1")
            .send(data);
            expect(res.body.title).toBe(data.title);
            expect(res.body.title).not.toBe(beforeTitle);// checking if it is not equal to value before update
        })
    })

    //Patch Request below
    describe('PATCH Requests',()=>{
        it('PATCH /posts/{id}', async()=>{
            const data ={
                "title":"Patch Updated New Title"
            }
            //before state of response before put operation
            const getRes =request
            .get("/posts/1");
            const beforeTitle = (await getRes).body.title;
            console.log(beforeTitle);
            const res = await request
            .patch("/posts/1")
            .send(data);
            expect(res.body.title).toBe(data.title);
            expect(res.body.title).not.toBe(beforeTitle);// checking if it is not equal to value before update
        })

    })
    //Delete request below
    describe('DELETE requests', ()=>{
        //below is where we are going to start writing test
    it('DELETE /posts/:id',async()=>{
        const res = await request.delete('/posts/1');// response we get after making get request call
        //anything in JS is asynchronous call, so we add 'await' keyword above and change fn to async
       // console.log(res);// print response in console o/p
        //assertions below to check testcases
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({});//check if response body is empty as per delete api spec
        //expect(res.body).toEqual({id: 1});// if its like this test will fail       
    })
    
    })

})