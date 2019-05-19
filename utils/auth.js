import Router from 'next/router';
import nextCookie from 'next-cookies';

export const auth = ctx => {
  const { loggedIn } = nextCookie(ctx);

  if (ctx.req && !loggedIn) {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
    return;
  }

  if (!loggedIn) {
    Router.push('/login');
  }

  return loggedIn;
};
