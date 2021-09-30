const totalLikes = require('../utils/list_helper').totalLikes; 

describe('totalLikes tests', ()=>{
    const blogs = [{"_id":"61525a2fb913391a31c43fbb","title":"Blog entry","author":"Henrique","url":"url do blog","likes":99,"__v":0},{"_id":"615260c4f9b757f2c2e9c499","title":"Blog entry 2","author":"Henrique 2","url":"url do blog 2","likes":992,"__v":0}]; 

    test ('two objects', ()=>{
        let result = totalLikes(blogs); 
        expect(result).toBe(1091);
    });  

    test ('empty array', ()=>{
        let result = totalLikes([]); 
        expect(result).toBe(0);
    });  
})