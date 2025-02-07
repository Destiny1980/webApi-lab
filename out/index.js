"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const films_1 = __importDefault(require("./films"));
const app = new koa_1.default();
const router = new koa_router_1.default();
router.get('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = { msg: 'Hello world!' };
    yield next();
}));
router.post('/', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    ctx.body = data;
    yield next();
}));
router.get('/films', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = films_1.default;
    yield next();
}));
router.get('/films/id', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = ctx.params.id;
    films_1.default.forEach(f, i);
    {
        if (id == f.id) {
            ctx.body = films_1.default[i];
        }
    }
}));
router.post('/films', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    films_1.default.push(data);
    ctx.body = films_1.default;
    yield next();
}));
router.put('/films', (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = ctx.request.body;
    films_1.default.forEach((f) => {
        if (data.id == films_1.default.id) {
            f.title = data.title;
            f.duartion = data.duartion;
        }
        ctx.body = films_1.default;
        yield next();
    });
    app.use((0, koa_json_1.default)());
    app.use((0, koa_logger_1.default)());
    app.use((0, koa_bodyparser_1.default)());
    app.use(router.routes()).use(router.allowedMethods());
    app.listen(10888, () => {
        console.log("Koa Started");
    });
}));
