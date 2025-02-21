import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";
import films from './films';

const app: Koa = new Koa();
const router: Router = new Router();

const customErrorMessage: CustomErrorMessageFunction = (
    _ctx: RouterContext,
    value: string
   ) => {
    return (`The name must be between 3 and 20 ` + `characters long but received length ${value.length}`);
}



router.get('/', async (ctx: RouterContext, next: any) => {
 ctx.body = { msg: 'Hello world!' };
 await next();
})

router.post('/', async (ctx: RouterContext, next: any) => {
    const data = ctx.request.body;
    ctx.body = data;
    await next();
})

const validatorName = [
    body("name").isLength({ min: 3
   }).withMessage(customErrorMessage).build(),
    body("id").isInt({ min: 10000, max: 20000 }).build()
   ]

router.post('/',  ...validatorName, async (ctx: RouterContext, next: any)   => {
const result = validationResults(ctx);
 if (result.hasErrors()) {
 ctx.status = 422;
 ctx.body = { err: result.mapped() }
 } else {
 ctx.body = { msg: `Hello world! ${ctx.query.name}` };
 }
 await next();

})

//get the data from /films
router.get('/films', async (ctx: RouterContext, next: any) => {
    ctx.body = films;
    await next()
})

router.get('/films/:id',  async (ctx: RouterContext, next: any) => {
    const id:any= ctx.params.id;
    films.forEach((f, i) => {
        if(id == f.id){
            ctx.body = films[i]
        }
    })
})

router.post('/films', async (ctx: RouterContext, next: any) => {
    const data:any = ctx.request.body;
    films.push(data);
    ctx.body = films;
    await next()
})


//update the current ids
router.put('/films', async (ctx: RouterContext, next: any) => { 
    const data: any = ctx.request.body;
    films.forEach((f) => {
        if(data.id == f.id){
            f.title = data.title;
        }

    })
    ctx.body = films;

    await next()
})


app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx: RouterContext, next: any) => {
    try {
    await next();
    if (ctx.status === 404) {
    ctx.status = 404;
    ctx.body = { err: "No such endpoint existed" };
    }
    } catch (err: any) {
    ctx.body = { err: err };
    }
   })


app.listen(10888, () => {
 console.log("Koa Started");
})