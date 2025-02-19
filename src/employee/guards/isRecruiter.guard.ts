import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class IsRecruiter implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const employee = request.user;

    if (!employee || !employee.role) {
      return false;
    }

    if (employee.type !== 'Recruiter') {
      throw new ForbiddenException(
        'Only Recruiters have access to the given request',
      );
    }

    return true;
  }
}
