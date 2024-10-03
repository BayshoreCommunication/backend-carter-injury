import User from "../../database/models/User.js";
import Blog from "../../database/models/Blog.js";
import Media from "../../database/models/Media.js";

const blog_data = async(req, res) => {
    const id = req.user._id.toString();    

    try{
            if(req.method == 'GET'){
                const blogs =await Blog.find({user: id}).sort({ createdAt: -1 })
                return  res.status(200).json({ data: blogs})
            
            }
           if(req.method == 'POST'){
            const { title,body,metaDescription,author,category,featuredImage,published,slug ,bodyImage} = req.body
            const user = await User.findOne({ _id: id })
            const blog = await Blog.findOne({slug:slug})
            if(blog){
                return  res.status(400).json({error:"slug already exists"});

            }
            const blogCreated = await Blog.create({
                title,body,metaDescription,author,category,featuredImage,published,slug,bodyImage,
                user:id
              });
              user.blogs.push(blogCreated._id);
              await user.save();
             const media = await Media.findOne({'image.url':featuredImage.image.url}) 
            if(!media){
                const mediaCreated = await Media.create({
                    image:featuredImage.image,
                    imageTitle:featuredImage.imageTitle,
                    altText:featuredImage.altText,
                    user:id
                  });
                  user.medias.push(mediaCreated._id);
                  await user.save();
            }
            

              bodyImage.map(async(item) =>{
                const media = await Media.findOne({'image.url':item.image.url}) 

                if(!media){
                    const mediaCreated = await Media.create({
                        image:item.image,
                        imageTitle:item.imageTitle,
                        altText:item.altText,
                        user:id
                      });
                      user.medias.push(mediaCreated._id);
                      await user.save();
                }

              })
        
          return  res.status(200).json({ success: 'Created Successfully'})
           }
    }
    catch(e){
        return  res.status(400).json({error:e});

    }
   
 

}
export default blog_data;
