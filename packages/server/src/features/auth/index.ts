import { Hono } from 'hono';
import type { HonoContextType } from '../../types/context.type';
import { authtenticateController } from './controllers/authenticate.controller';
import { magiclinkSendController } from './controllers/magiclink/send.controller';
import { magiclinkVerifyController } from './controllers/magiclink/verify.controller';
import { orgCreateController } from './controllers/org/create.controller';
import { orgSigninController } from './controllers/org/signin.controller';
import { signoutController } from './controllers/signout.controller';

const authHandlers = new Hono<HonoContextType>()
	.post('/authenticate', ...authtenticateController)
	.post('/signout', ...signoutController)
	.post('/magiclink/send', ...magiclinkSendController)
	.post('/magiclink/verify', ...magiclinkVerifyController)
	.post('/org/create', ...orgCreateController)
	.post('/org/signin', ...orgSigninController);

export default authHandlers;
