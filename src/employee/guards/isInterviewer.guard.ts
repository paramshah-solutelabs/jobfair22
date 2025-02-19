import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class isInterviewer implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const employee = request.user;

    if (!employee || !employee.role) {
      return false;
    }

    if (employee.type !== 'Interviewer') {
      throw new ForbiddenException(
        'Only Interviewers can access the given route',
      );
    }

    return true;
  }
}
