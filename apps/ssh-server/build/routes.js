"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', async (req, res) => {
    res.status(200).json({
        title: 'SSH/SFTP Terminal Server',
        message: 'The app is working properly!',
        url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
    });
});
exports.default = router;
//# sourceMappingURL=routes.js.map