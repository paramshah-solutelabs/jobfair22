import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { Candidate } from './candidate.entity';
import { LoginUser } from './dto/login-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { QueryRunner } from 'typeorm';
import { Req } from '@nestjs/common';
import { Tokens } from 'src/tokens/tokens.entity';
import { ResetPassword } from './dto/reset-password.dto';

@Controller('candidates')
export class CandidateController {
  constructor(private readonly candidateService: CandidateService) {}

  @Post('createCandidate')
  async createCandidate(@Body() createCandidate: CreateCandidateDto) {
    return await this.candidateService.candidateInfo(createCandidate);
  }

  @Post('login')
  async login(@Body() loginCandidate: LoginUser) {
    return await this.candidateService.login(loginCandidate);
  }

  @Post("reset-password")
  async resetPassword(@Body() resetPassword:ResetPassword,@Req() request):Promise<Candidate>{
    const token=request.headers['authorization'];
    return await this.candidateService.resetPassword(resetPassword,token)
  }

  @Post('forgotPassword')
  async forgotPassword(@Body('email') email: string) {
    return await this.candidateService.forgotPassword(email);
  }

  @Put(':id')
  async updateCandidate(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    return this.candidateService.updateCandidate(id, updateCandidateDto);
  }

  @Delete(':id')
  async deleteCandidate(@Param('id') id: string): Promise<boolean> {
    return this.candidateService.deleteUser(id);
  }

  @Get(':id')
  async getCandidateById(@Param('id') id: string): Promise<Candidate> {
    return this.candidateService.getCandidateById(id);
  }
}
