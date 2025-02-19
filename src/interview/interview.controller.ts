import {
  Body,
  Controller,
  Param,
  Post,
  UseGuards,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { Interview } from './interview.entity';
import { InterviewService } from './interview.service';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { AuthGuard } from '@nestjs/passport';
import { IsRecruiter } from 'src/employee/guards/isRecruiter.guard';
import { isUser } from 'src/employee/guards/isUser.guard';
import { updateInterviewDto } from './dto/update-interview.dto';

@Controller('interview')
export class InterviewController {
  constructor(private readonly interviewServices: InterviewService) {}

  @UseGuards(AuthGuard(), IsRecruiter)
  @Post()
  async createInterview(
    @Body() createInterviewDto: CreateInterviewDto,
  ): Promise<Interview> {
    return this.interviewServices.createInterview(createInterviewDto);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), isUser)
  async getInterviewById(@Param('id') id: string) {
    return this.interviewServices.getInterviewById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), isUser)
  async updateInterview(
    @Param('id') id: string,
    @Body() updateInterview: updateInterviewDto,
  ) {
    await this.interviewServices.updateInterview(id, updateInterview);
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), isUser)
  async deleteInterview(@Param('id') id: string) {
    await this.interviewServices.deleteInterview(id);
  }
}
