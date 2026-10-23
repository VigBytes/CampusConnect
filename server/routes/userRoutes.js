import express from 'express'
import { upload } from '../config/multer.js';
import { protect } from '../middlewares/auth.js';
import { getUserData, updateUserData, discoverUsers, followUser, unfollowUser,sendConnectionRequest,acceptConnectionRequest,getUserConnections ,getUserProfiles} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', protect, getUserData);
userRouter.post('/update', protect, upload.fields([{ name: 'profile', maxCount: 1 }, { name: 'cover', maxCount: 1 }]), updateUserData);
userRouter.post('/discover', protect, discoverUsers);
userRouter.post('/follow', protect, followUser);
userRouter.post('/unfollow', protect, unfollowUser);
userRouter.post('/connect',protect,sendConnectionRequest);
userRouter.post('/accept',protect,acceptConnectionRequest);
userRouter.get('/connections',protect,getUserConnections);
userRouter.post('/profiles',protect,getUserProfiles);

export default userRouter;