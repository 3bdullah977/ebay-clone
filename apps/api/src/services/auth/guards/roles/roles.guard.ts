import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<
      Array<'buyer' | 'seller'>
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredRoles) return true;
    const user = context.switchToHttp().getRequest().user;
    console.log(user);
    return requiredRoles.some((role) => user.role === role);
  }
}
