import {Router} from 'express';
import {
    createCollaborator
} from '../controllers/collaborator.controller.js';

const router = Router();

router.post('/createCollaborator', createCollaborator);

export default router;