import Story from '../models/Story.js';
import fs from 'fs';
import imagekit from '../config/imageKit.js';
import User from '../models/User.js';



//Add a new story
export const addUserStory=async(req,res)=>{
      try{
            const {userId}=req.auth();
            const {content,media_type,background_color}=req.body;
            const media = req.file
            let media_url = '';

            //upload media to imagekit
            if(media_type==='image'||media_type==='video'){
                  const fileBuffer=fs.readFileSync(media.path);
                  const fileName=media.originalname;
                  const response=await imagekit.upload({
                        file:fileBuffer,
                        fileName:fileName    
                  });
                  media_url=response.url;
            }
            //create a new story
           const story = await Story.create({
                  user:userId,
                  content:content,
                  media_url:media_url,
                  media_type:media_type,
                  background_color:background_color
            });

            //schedule a job to delete the story after 24 hours
            await inngest.send({
                  name:'app/story.delete',
                  data:{
                        storyId:story._id
                  }
            });
            res.json({ success: true, message: 'Story added successfully', story });
      }catch(error){
            console.error('Error adding story:', error);
        res.json({ message: 'Error adding story', error });
      }
  }

  //Get User Stories
export const getStories=async(req,res)=>{
      try{
            const {userId}=req.auth();
            const user = await User.findById(userId);
            if(!user){
                  return res.json({message:'User not found'});
            }
            const userIds=[userId,...user.following,...user.connections];
            const stories=await Story.find({user:{$in:userIds}}).populate('user').sort({createdAt:-1});
            res.json({success:true,stories});
      }catch(error){
            console.error('Error fetching user stories:', error);
            res.json({message:'Error fetching user stories',error});
      }

      }