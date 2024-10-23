import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;  // No roles required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log("user: ",user)
    // If no user or roles are defined, deny access
    if (!user || !user.type) {
      return false;
    }

    // Check if the user has one of the required roles
    return requiredRoles.some((type) => user.type.includes(type));
  }
}
