import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { ROLES_KEY } from './role.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {} // Khai báo reflector sử dụng để đọc metadata => ở đây là đọc metadata của decorator roles

    canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]); // Lấy ra các role cần thiết cho route (Khai báo thông qua @Roles ở các route)

    // Nếu không có role nào thì trả về true
    if (!requiredRoles) {
        return true;
    }

    // Lấy ra user từ request
    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra xem user có role nào trong các role cần thiết không
    return requiredRoles.some((role) => user.role === role);
  }
}
