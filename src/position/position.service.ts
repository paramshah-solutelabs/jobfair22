import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { Repository } from 'typeorm';
import { DepartmentService } from 'src/department/department.service';
import { CreatePositionDto } from './dto/create-positon.dto';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,

    private departmentService: DepartmentService,
  ) {}

  async createPosition(
    createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    const { departmentId, ...positionData } = createPositionDto;

    const existingPosition = await this.positionRepository.find({
      where: { title: createPositionDto.title },
    });
    if (existingPosition.length > 0) {
      throw new HttpException(
        'Position already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const department = await this.departmentService.findById(departmentId);

    if (!department) {
      throw new NotFoundException(
        `Department with ID ${departmentId} not found`,
      );
    }

    const position = this.positionRepository.create({
      ...positionData,
      department,
    });

    return this.positionRepository.save(position);
  }

  async savePosition(position: Position) {
    return this.positionRepository.save(position);
  }

  async updatePosition(
    id: string,
    updateData: Partial<Position>,
  ): Promise<Position> {
    const position = await this.positionRepository.findOne({ where: { id } });

    if (!position) {
      throw new NotFoundException(`Position with ID ${id} not found`);
    }

    Object.assign(position, updateData);
    return this.positionRepository.save(position);
  }

  async getPositionById(id: string): Promise<Position> {
    const foundPosition = await this.positionRepository.findOne({
      where: { id },
    });
    if (!foundPosition) {
      throw new NotFoundException('Position does not exist');
    }
    return foundPosition;
  }
}
