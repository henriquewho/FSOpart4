const favourite_blog = require('../utils/list_helper').favourite_blog; 

describe ('favourite_blog tests', ()=>{
    const blogs = [{"_id":"61525a2fb913391a31c43fbb","title":"Blog entry","author":"Henrique","url":"url do blog","likes":99,"__v":0},{"_id":"615260c4f9b757f2c2e9c499","title":"Blog entry 2","author":"Henrique 2","url":"url do blog 2","likes":992,"__v":0}, 
    {"_id":"615260c4f9b757f2c2e9c433","title":"Blog entry 3","author":"Henrique 3","url":"url do blog 3","likes":44,"__v":0}]; 

    const empty = [];

    test ('with 3 blogs', ()=>{
        expect(favourite_blog(blogs)).toEqual({
            title: 'Blog entry 2', author: 'Henrique 2', likes: 992
        })
    })

    test ('no blogs', ()=>{
        expect(favourite_blog(empty)).toEqual({
            title: 'none', author: 'none', likes: 0
        })
    })
})