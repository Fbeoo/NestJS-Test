import { SetMetadata } from '@nestjs/common';
import { Role } from './role.enum';

export const ROLES_KEY = 'roles'; // Khai báo const roles_key
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles); // Khai báo decorator roles