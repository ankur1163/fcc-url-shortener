'use strict';

import Koa from 'koa';
import router from './routes.js';

const app = new Koa();

app.name = 'request-header-parser-microservice';

app.use(router.routes());

export default app;
