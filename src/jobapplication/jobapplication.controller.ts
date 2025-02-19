import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { JobapplicationService } from './jobapplication.service';
import { CreateJobApplicationDto } from './dto/create-application.dto';
import { JobApplication } from './jobapplication.entity';
import { AuthGuard } from '@nestjs/passport';
import { IsCandidate } from 'src/candidate/guards/isCandidate.guard';
import { ApplicationStatus } from './dto/job-application.status.enum';
import { isUser } from 'src/employee/guards/isUser.guard';
import { Query } from '@nestjs/common';
import { GetCandidate } from 'src/candidate/guards/getCandidate.decorator';
import { Candidate } from 'src/candidate/candidate.entity';

@Controller('jobapplication')
export class JobapplicationController {
  constructor(private jobApplicationService: JobapplicationService) {}

  @Post()
  // @UseGuards(AuthGuard(), IsCandidate)
  async createJobApplication(
    @Body() createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    return await this.jobApplicationService.createJobApplication(
      createJobApplicationDto,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard(), isUser)
  async getApplicationById(id: string) {
    return await this.jobApplicationService.getApplicationById(id);
  }

  @Get('candidate/:id')
  @UseGuards(AuthGuard(), IsCandidate)
  async getApplicationForCandidate(
    @GetCandidate() candidate: Candidate,
    @Param('id') id: string,
  ) {
    return await this.jobApplicationService.getApplicationForCandidate(
      id,
      candidate,
    );
  }

  @Get()
  @UseGuards(AuthGuard(), isUser)
  async getApplications(
    @Query('status') status?: ApplicationStatus,
  ): Promise<JobApplication[]> {
    return this.jobApplicationService.getApplications(status);
  }

  // @Put(':id')
  // @UseGuards(AuthGuard(), isUser)
  // async updateJobApplicationStatusById(
  //   @Param('id') id: string,
  //   @Body('status') status: ApplicationStatus,
  // ) {
  //   return await this.jobApplicationService.updateJobApplicationStatus(
  //     id,
  //     status,
  //   );
  // }
}
