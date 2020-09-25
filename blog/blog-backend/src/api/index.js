import Router from 'koa-router';
import posts from './posts';
import auth from './auth'; //auth라우터를 api라우터에 적용

const api = new Router();

api.use('./posts', posts.routes());
api.use('./auth', auth.routes());

//라우터를 내보낸다.
export default api;
