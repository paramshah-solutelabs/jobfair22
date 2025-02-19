import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from './tokens.entity';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens]),
],
  controllers: [TokensController],
  providers: [TokensService],
  exports: [TokensService],
  
})
export class TokensModule {}
