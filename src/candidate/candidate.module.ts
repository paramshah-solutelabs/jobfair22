import { Module } from '@nestjs/common';
import { CandidateController } from './candidate.controller';
import { CandidateService } from './candidate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { SendEmailToUserService } from './functions/sendMail';
import { TokensModule } from 'src/tokens/tokens.module';
import { TokensService } from 'src/tokens/tokens.service';

@Module({
  imports: [
    TokensModule,
    TypeOrmModule.forFeature([Candidate]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [CandidateController],
  providers: [CandidateService, JwtStrategy, SendEmailToUserService,TokensModule],
  exports: [CandidateService],
})
export class CandidateModule {}
