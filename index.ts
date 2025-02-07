import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import films from "./films";
const app: Koa = new Koa();
const router: Router = new Router();
router.get('/', async (ctx: RouterContext, next: any) => {
 ctx.body = { msg: 'Hello world!' };
 await next();
})
router.post ('/', async(ctx: RouterContext, next:any) => {
    const data = ctx.request.body;
    ctx.body = data;
    await next();
})
router.get('/films',async(ctx: RouterContext, next:any)=> {
    ctx.body = films;
    await next();
});
router.get('/films/id',async(ctx: RouterContext, next:any)=> {
    const id  = ctx.params.id;
    films.forEach（(f, i)） => {
        if(id == f.id){
        ctx.body = films[i];
        }
    })
})

router.post('/films',async(ctx: RouterContext, next:any)=> {
    const data : any = ctx.request.body;
    films.push(data);
    ctx.body = films;
    await next();
})

router.put('/films',async(ctx: RouterContext, next:any)=> {
    const data : any = ctx.request.body;
    films.forEach((f) => {
        if(data.id == f.id){
            f.title = data.title;
            f.duration = data.duration;
    }

    ctx.body = films;
    await next();
})
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.listen(10888, () => {
 console.log("Koa Started");
})