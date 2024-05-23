import express from 'express';
import { GetAllData, GetCard, GetData, Login, SaveData, Signup } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup',Signup);
router.post('/login',Login);
router.post('/save',SaveData);
router.post('/getdata',GetData);
router.post('/getalldata',GetAllData);
router.post('/getcard',GetCard);


export default router;