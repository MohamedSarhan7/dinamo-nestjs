import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../types';

export const Roles = (...roles: RoleType[]) => SetMetadata('roles', roles);