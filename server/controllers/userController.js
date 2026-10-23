import User from "../models/User.js";
import fs from "fs";

import imagekit from '../config/imageKit.js';
import Connection from "../models/Connection.js";
import Post from "../models/Post.js";



//get User Data using UserId
export const getUserData=async (req,res)=>{
    try{
        const {userId}=req.auth();
        const user=await User.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found"})
        }
        res.json({success:true,data:user})
        }catch(err){
        console.error(err);
        return res.json({success:false,message:err.message})
    }
}

//Update User Data using UserId
export const updateUserData=async (req,res)=>{
      try{
          const {userId}=req.auth();
          let { username, bio, location, full_name } = req.body;
          const tempUser=await User.findById(userId);
          !username && (username=tempUser.username);
          if(tempUser.username!==username){
            const user=await User.findOne({username});
            if(user){
                username=tempUser.username;
            }
          }
        const updatedData={
            username,
            bio,
            location,
            full_name
        }
       const profile = req.files.profile&&req.files.profile[0] ;
       const cover = req.files.cover&&req.files.cover[0] ;
        if(profile){
            const buffer = fs.readFileSync(profile.path);
            const response = await imagekit.upload({
                file: buffer,
                fileName: profile.originalname,
            });
            const url=imagekit.url({
                path: response.filePath,
                  transformation: [
                        {quality: "auto"},
                        {format: "webp"},
                        {width:'512'}
                  ],
            });
            updatedData.profile_picture=url;
        }
       if(cover){
                  const buffer = fs.readFileSync(cover.path);
                  const response = await imagekit.upload({
                        file: buffer,
                        fileName: cover.originalname,
                  });
                  const url=imagekit.url({
                      path: response.filePath,
                        transformation: [
                              {quality: "auto"},
                              {format: "webp"},
                              {width:'1280'}
                        ],
                  });
                  updatedData.cover_photo=url;
        }
            const user=await User.findByIdAndUpdate(userId,updatedData,{new:true});
            res.json({success:true,data:user,message:"User data updated successfully"})
      }catch(err){
          console.error(err);
          return res.json({success:false,message:err.message})
      }
}

//Find Users by username,email,location,full_name
export const discoverUsers=async (req,res)=>{
      try{
            const {userId}=req.auth();
            const {input}=req.body;
            const allUsers=await User.find(
                  {
                      $or:[
                        {username:new RegExp(input,'i')},
                        {email:new RegExp(input,'i')},
                        {location:new RegExp(input,'i')},
                        {full_name:new RegExp(input,'i')}
                          ]
                  }
            )
            const filteredUsers=allUsers.filter(user=>user._id!==userId);
            res.json({success:true,data:filteredUsers})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}

//Follow User
export const followUser=async (req,res)=>{
      try{
            const {userId}=req.auth();
            const {id}=req.body;
            const user=await User.findById(userId);
            if(user.following.includes(id)){
                  return res.json({success:false,message:"You are already following this user"})
            }
            const userToFollow=await User.findById(id);
            userToFollow.followers.push(userId);
            await userToFollow.save();
            user.following.push(id);
            await user.save();
            res.json({success:true,message:"User followed successfully"})

      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}

//Unfollow User
export const unfollowUser=async (req,res)=>{
      try{
            const {userId}=req.auth();
            const {id}=req.body;
            const user=await User.findById(userId);
            const userToUnfollow=await User.findById(id);
            userToUnfollow.followers=userToUnfollow.followers.filter(followerId=>followerId!==userId);
            await userToUnfollow.save();
            user.following=user.following.filter(followingId=>followingId!==id);
            await user.save();
            res.json({success:true,message:"User unfollowed successfully"})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}


//Send Connection Request
export const sendConnectionRequest=async (req,res)=>{
      try{
            const {userId}=req.auth();
            const {id}=req.body;
            const connection = await Connection.findOne({
                  $or:[
                        {from_user_id:userId,to_user_id:id},
                        {from_user_id:id,to_user_id:userId}
                  ]
            })
            if(!connection){
                  await Connection.create({
                        from_user_id:userId,
                        to_user_id:id,
                  })
                  res.json({success:true,message:"Connection request sent successfully"})
            }
            else if(connection&&connection.status==="accepted"){
                  return res.json({success:false,message:"You are already connected with this user"})
            }
            return res.json({success:false,message:"Connection request pending"})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}

//get user connections
export const getUserConnections=async (req,res)=>{
      try{
            const {userId}=req.auth();
           const user = await User.findById(userId).populate("connections followers following");
           const connections=user.connections;
           const followers=user.followers;
           const following=user.following;

const pending = await Connection.find({
    to_user_id: userId,
    status: "pending"
}).populate("from_user_id");

const pendingConnections = pending.map(
    connection => connection.from_user_id
);
           res.json({success:true,data:{connections,followers,following,pendingConnections}})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}

//Accept Connection Request
export const acceptConnectionRequest=async (req,res)=>{
      try{
            const {userId}=req.auth();
            const {id}=req.body;
            const connection = await Connection.findOne({
                  from_user_id:id,
                  to_user_id:userId,
                  
            })
            if(!connection){
                  return res.json({success:false,message:"Connection request not found"})
            }
            const user = await User.findById(userId);
            user.connections.push(id);
            await user.save();
            const userToConnect = await User.findById(id);
            userToConnect.connections.push(userId);
            await userToConnect.save();
            connection.status="accepted";
            await connection.save();
            res.json({success:true,message:"Connection request accepted successfully"})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }


}

//Get User Profile
export const getUserProfiles=async (req,res)=>{
      try{
            const {profileId}=req.body;
            const profile=await User.findById(profileId);
            if(!profile){
                  return res.json({success:false,message:"User not found"})
            }
            const posts=await Post.find({user:profileId}).populate("user");
            res.json({success:true,data:{profile,posts}})
      }catch(err){
            console.error(err);
            return res.json({success:false,message:err.message})
      }
}