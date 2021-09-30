

const dummy = (blogs) =>{
    return 1; 
}

const totalLikes = (blogs) =>{
    return blogs.reduce((sum, each) => sum + each.likes, 0);
}

const favourite_blog = (blogs) => {
    let max = 0, index=0; 
    for (let i=0; i<blogs.length; i++){
        if (blogs[i].likes > max) {
            max = blogs[i].likes; 
            index = i; 
        }
    }

    return {
        title: blogs[index]?.title || 'none', 
        author: blogs[index]?.author || 'none', 
        likes: blogs[index]?.likes || 0, 
    }; 
}

module.exports = {
    dummy, totalLikes, favourite_blog
}