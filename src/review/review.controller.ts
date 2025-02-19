import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './review.entity';
import { AuthGuard } from '@nestjs/passport';
import { isInterviewer } from 'src/employee/guards/isInterviewer.guard';
import { isUser } from 'src/employee/guards/isUser.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard(), isUser)
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return this.reviewService.createReview(createReviewDto);
  }

  @Get()
  @UseGuards(AuthGuard(), isUser)
  async getReviews(): Promise<Review[]> {
    return await this.reviewService.getReviews();
  }
}
