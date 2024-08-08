"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const socket_1 = require("./socket");
const helpers_1 = require("./helpers");
const routes_1 = __importDefault(require("./routes"));
const logger_1 = require("./utils/logger");
const config_1 = require("./config");
// Middleware
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const httpServer = http_1.default.createServer(app);
// request handler
app.use(logger_1.infoLogger);
app.use(helpers_1.requestHandler);
// add socket.io
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*', // or client url
        methods: ['GET', 'POST']
    }
});
// set cors
app.use((0, cors_1.default)({ credentials: true, origin: true }));
app.set('trust proxy', true);
// parse cookies
app.use((0, cookie_parser_1.default)(config_1.COOKIE_SECRET));
io.on('connection', socket_1.socketConnection);
// Routes
app.use('/', routes_1.default);
// error logger
app.use(logger_1.errorLogger);
// error handler
app.use(helpers_1.errorHandler);
// not found handler
app.use(helpers_1.notFoundHandler);
// connection
httpServer.listen(config_1.PORT, async () => {
    logger_1.logger.info(`⚡️[server]: Server is running at http://localhost:${config_1.PORT}`);
});
//# sourceMappingURL=index.js.map