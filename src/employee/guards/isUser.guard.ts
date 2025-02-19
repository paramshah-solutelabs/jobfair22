import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class isUser implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const employee = request.user;
    const candidate = request.user;

    if (!employee || !employee.role) {
      return false;
    }

    const types = ['Interviewer', 'HiringManager', 'Recruiter', 'Admin'];

    return types.includes(employee.type);
  }
}
