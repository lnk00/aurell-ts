import { createFactory } from 'hono/factory';
import type { HonoContextType } from '../types/context.type';

export const factory = createFactory<HonoContextType>();
