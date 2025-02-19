import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetEmployeeType = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const employee = req.user;
    return employee.type;
  },
);
