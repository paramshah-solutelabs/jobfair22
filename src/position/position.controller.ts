import { Controller, Post, Body, UseGuards, Param, Get } from '@nestjs/common';
import { PositionService } from './position.service';
import { Position } from './position.entity';
import { CreatePositionDto } from './dto/create-positon.dto';
import { isHiringManager } from 'src/employee/guards/isHiringManager.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  // @UseGuards(AuthGuard(), isHiringManager)
  async create(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    return this.positionService.createPosition(createPositionDto);
  }

  @Get(':id')
  async getPositionById(@Param('id') id: string): Promise<Position> {
    return this.positionService.getPositionById(id);
  }
}
