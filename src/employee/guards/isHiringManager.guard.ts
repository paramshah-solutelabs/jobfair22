import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class isHiringManager implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const employee = request.user;

    if (!employee || !employee.role) {
      return false;
    }

    if (employee.type !== 'HiringManager') {
      throw new ForbiddenException(
        'Only Hiring managers can access the given route',
      );
    }

    return true;
  }
}
