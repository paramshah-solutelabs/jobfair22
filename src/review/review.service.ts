import { Injectable } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { InterviewService } from 'src/interview/interview.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JobapplicationService } from 'src/jobapplication/jobapplication.service';
import { ApplicationStatus } from 'src/jobapplication/dto/job-application.status.enum';
import { MeetingStatus } from 'src/interview/dto/meetingStatus.enum';

@Injectable()
export class ReviewService {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly interviewService: InterviewService,
    private readonly jobapplicationservice: JobapplicationService,
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    const { interviewId, employeeId, ...reviewData } = createReviewDto;

    const interview = await this.interviewService.getInterviewById(interviewId);
    const employee = await this.employeeService.getEmployeeById(employeeId);

    const review = this.reviewRepository.create({
      ...reviewData,
      interview,
      employee,
    });

    const savedReview = await this.reviewRepository.save(review);
    if (interview.application) {
      interview.application.has_reviewed = true;
      interview.application.reviewer_employee = employee;
      interview.application.status = ApplicationStatus.REVIEW;
      interview.status = MeetingStatus.COMPLETED;
      await this.interviewService.changeInterviewStatus(interview.id);
      await this.jobapplicationservice.save(interview.application);
    }

    return savedReview;
  }

  async getReviews(): Promise<Review[]> {
    return await this.reviewRepository.find();
  }
}
