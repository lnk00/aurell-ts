import { hc } from 'hono/client';
import type { AppType } from '../../../server/src/index';

export const rpcClient = hc<AppType>(import.meta.env.VITE_SERVER_URL);
