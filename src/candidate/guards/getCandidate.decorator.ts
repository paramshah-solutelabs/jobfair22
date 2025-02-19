import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Candidate } from '../candidate.entity';

export const GetCandidate = createParamDecorator(
  (_data, ctx: ExecutionContext): Candidate => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
