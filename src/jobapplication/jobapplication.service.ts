import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobApplication } from './jobapplication.entity';
import { CreateJobApplicationDto } from './dto/create-application.dto';
import { CandidateService } from 'src/candidate/candidate.service';
import { PositionService } from 'src/position/position.service';
import { ApplicationStatus } from './dto/job-application.status.enum';
import { BadRequestException } from '@nestjs/common';
import { MailService } from './functions/sendMail';
import { PositionStatus } from 'src/position/dto/position-status.enum';
import { ServerClient } from 'postmark';
import { CreateCandidateDto } from 'src/candidate/dto/create-candidate.dto';
import { GetCandidate } from 'src/candidate/guards/getCandidate.decorator';
import { Candidate } from 'src/candidate/candidate.entity';

@Injectable()
export class JobapplicationService {
  private client: ServerClient;
  constructor(
    @InjectRepository(JobApplication)
    private jobApplicationRepository: Repository<JobApplication>,
    private candidateService: CandidateService,
    private positionService: PositionService,
    private mailService: MailService,
  ) {
    this.client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
  }


  async getApplications(status?: ApplicationStatus): Promise<JobApplication[]> {
    if (!status) {
      return this.jobApplicationRepository.find();
    }
    return this.jobApplicationRepository.find({ where: { status } });
  }

  async createJobApplication(
    createJobApplicationDto: CreateJobApplicationDto,
  ): Promise<JobApplication> {
    // const candidate = await this.candidateService.getCandidateById(
    //   createJobApplicationDto.candidateId,
    // );

    const position = await this.positionService.getPositionById(
      createJobApplicationDto.positionId,
    );

    const existingApplication=await this.jobApplicationRepository.findOne({where:{email:createJobApplicationDto.email,position:{id:createJobApplicationDto.positionId}}});
    if (existingApplication) {
      const threeMonthsAgo = new Date();
      console.log(threeMonthsAgo)
      console.log(existingApplication.created_at)
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  
      if (existingApplication.created_at > threeMonthsAgo) {
        throw new BadRequestException(
          'You can only apply for this position once every 3 months. Please try again later.',
        );
      }
    }
  
    const jobApplication = this.jobApplicationRepository.create({
      ...createJobApplicationDto,
      // candidate,
      position,
    });
    const savedApplication =
      await this.jobApplicationRepository.save(jobApplication);
    await this.candidateService.create(jobApplication.email);
    await this.mailService.welcomeCandidate(createJobApplicationDto.email);
    return savedApplication;
  }

  async save(apl: JobApplication): Promise<JobApplication> {
    return await this.jobApplicationRepository.save(apl);
  }

  // async updateJobApplicationStatus(
  //   id: string,
  //   status: ApplicationStatus,
  // ): Promise<JobApplication> {
  //   const jobApplication = await this.jobApplicationRepository.findOne({
  //     where: { id },
  //   });
  //   if (!jobApplication) {
  //     throw new NotFoundException(`Job application with ID ${id} not found`);
  //   }
  //   const currentOpenings = jobApplication.position.openings;

  //   if (status == 'Hired') {
  //     if (currentOpenings == 1) {
  //       jobApplication.position.openings = currentOpenings - 1;
  //       jobApplication.position.status = PositionStatus.CLOSED;
  //       await this.positionService.savePosition(jobApplication.position);
  //     } else {
  //       jobApplication.position.openings = currentOpenings - 1;
  //       await this.positionService.savePosition(jobApplication.position);
  //     }
  //     await this.mailService.isHired(
  //       jobApplication.candidate.id,
  //       40000,
  //       jobApplication.position.title,
  //     );
  //   }

  //   if (!Object.values(ApplicationStatus).includes(status)) {
  //     throw new BadRequestException(`Invalid status value`);
  //   }

  //   jobApplication.status = status;

  //   const application =
  //     await this.jobApplicationRepository.save(jobApplication);
  //   if (status == 'Screening') {
  //     await this.mailService.sendEmailToHiringManager(application);
  //   }
  //   return application;
  // }

  async getApplicationById(id: string): Promise<JobApplication> {
    const apl = await this.jobApplicationRepository.findOne({ where: { id } });
    return apl;
  }

  async getApplicationForCandidate(
    id: string,
    candidate: Candidate,
  ): Promise<JobApplication> {
    const apl = await this.jobApplicationRepository.findOne({ where: { id } });
    if (candidate.email != apl.email) {
      throw new BadRequestException('Application not accessible');
    }
    return apl;
  }
}
