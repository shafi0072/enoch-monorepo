import { AuthController } from './auth.controller';
import { CrudController } from './crud.controller';
import { EventListener } from './events-listening.controller';
export const controllers = [AuthController, EventListener, CrudController];
