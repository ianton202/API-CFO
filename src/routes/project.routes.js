import {Router} from 'express';
import {createProject} from '../controllers/project.controller.js';

const router = Router();

router.post('/createProject', createProject);

export default router;