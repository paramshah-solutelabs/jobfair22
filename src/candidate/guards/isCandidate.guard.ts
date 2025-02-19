import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class IsCandidate implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user || !('resume_url' in user)) {
      throw new ForbiddenException(
        'Only Candidates can submit job applications',
      );
    }
    return true;
  }
}
