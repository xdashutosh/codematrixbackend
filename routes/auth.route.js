import express from 'express';
import { GetAllData, GetApprove, GetCard, GetData, Login, SaveData, Signup, Userdata } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',Signup);
router.post('/login',Login);
router.post('/news-post',SaveData);
router.post('/getdata',GetData);
router.post('/getalldata',GetAllData);
router.post('/getcard',GetCard);
router.post('/getuser',Userdata);
router.post('/approve',GetApprove)


export default router;