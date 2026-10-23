import Message from '../models/Message.js';
import fs from 'fs';
import imagekit from '../config/imageKit.js';
import User from '../models/User.js';

//Create an empty object to store Server Side Event Connections
const connections = {};

//Cotroller function to handle Server Side Event Endpoints
export const sseController = (req, res) => {
      const {userId} = req.params;
      console.log('New Client Connected:', userId);

      //Set SSE headers
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');

      //Add the clients response object to the connections object
      connections[userId] = res;

      //Send an initial event to the client
      res.write('log:Connected to SSE stream\n\n');

      //Handle client disconnect
      req.on('close', () => {
            console.log('Client Disconnected:', userId);
            delete connections[userId];
      });

}

//Send Message
export const sendMessage = async (req, res) => {
     try{
      const {userId} = req.params;
      const {text,to_user_id} = req.body;
      const image=req.file;
      let media_url = '';
      let message_type = image? 'image':'text';
      if(message_type === 'image') {
            const fileBuffer = fs.readFileSync(image.path);
            const response = await imagekit.upload({
                  file: fileBuffer,
                  fileName: image.originalname,
            });
            media_url = imagekit.url({
                  path: response.filePath,
                  transformation:[
                        {quality:'auto'},
                        {format:'webp'},
                        {width:'1280'}
                  ]
            })
      }
      const message = await Message.create({
            from_user_id: userId,
            to_user_id,
            text,
            media_url,
            message_type
      })
      res.json({success:true,message:message});

      //Send message to the to_user_id usig SSE
      const messageWithUserData = await Message.findById(message._id).populate('from_user_id');

      if(connections[to_user_id]){
            connections[to_user_id].write(`data: ${JSON.stringify(messageWithUserData)}\n\n`);
      }


     }catch(err){
          console.error('Error sending message:', err);
          res.status(500).json({ error: 'Internal Server Error' });
     }


}


//Get Chat Messages
export const getChatMessages = async (req, res) => {
      try{
            const {userId} = req.auth();
            const {to_user_id}= req.body;
            const messages = await Message.find({
                  $or:[
                        {from_user_id:userId,to_user_id},
                        {from_user_id:to_user_id,to_user_id:userId}
                  ]
            }).sort({createdAt:1}).populate('from_user_id');

            await Message.updateMany({
                  from_user_id:to_user_id,
                  to_user_id:userId,
            },{
                 seen:true
            })
            res.json({success:true,messages});
      }catch(err){
           res.json({success:false,message:err.message});
      }
}


