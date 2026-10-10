import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

      _id:{type: String, required: true},
      email: { type: String, required: true, unique: true },
      full_name: { type: String, required: true },
      username: { type: String, unique: true },
      bio: { type: String ,default: "Hey there! I am using CampusConnect."},  
      profile_picture: { type: String, default: "" },                                
      cover_photo: { type: String, default: "https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg" },
      location: { type: String, default: "" },
      followers: [{ type: String, ref: "User" }],
      following: [{ type: String, ref: "User" }],
      connections: [{ type: String, ref: "User" }],
},{timestamps: true ,minimize: false});

const User = mongoose.model("User", userSchema);
export default User;