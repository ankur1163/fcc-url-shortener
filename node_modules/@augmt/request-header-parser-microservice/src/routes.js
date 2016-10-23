'use strict';

import Router from 'koa-router';
import { parse } from 'useragent';

const router = new Router();

function trimTrailingZeros(string) {
  return string.replace(/\b\s?[0.]+$/, '');
}

router.get('/', (ctx) => {
  const addresses = ctx.get('x-forwarded-for');
  const accepts = ctx.acceptsLanguages();
  const agent = parse(ctx.get('user-agent'));

  ctx.body = {
    ipaddress: addresses.split(', ')[0],
    language: accepts[0] || '',
    software: trimTrailingZeros(agent.os.toString())
  };
  ctx.type = 'json';
});

export default router;
