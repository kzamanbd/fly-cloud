import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    res.status(200).json({
        title: 'SSH/SFTP Terminal Server',
        message: 'The app is working properly!',
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
});

export default router;
