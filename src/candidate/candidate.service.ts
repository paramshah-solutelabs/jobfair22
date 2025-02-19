import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Candidate } from './candidate.entity';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { Status } from './dto/candidate-status.enum';
import { v4 as uuid } from 'uuid';
import { SendEmailToUserService } from './functions/sendMail';
import { TokensService } from 'src/tokens/tokens.service';
import { Req } from '@nestjs/common';
import { Tokens } from 'src/tokens/tokens.entity';
import { ResetPassword } from './dto/reset-password.dto';

@Injectable()
export class CandidateService {
  constructor(
    @InjectRepository(Candidate)
    private candidateRepository: Repository<Candidate>,
    private jwtService: JwtService,
    private mailService: SendEmailToUserService,
    private tokenService:TokensService
  ) {}

  async create(email: string): Promise<Candidate | void> {
    const existingUser = await this.candidateRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      return;
    }

    const newCandidate = this.candidateRepository.create({ email });
    return await this.candidateRepository.save(newCandidate);
  }

  async resetPassword(resetPassword: ResetPassword, token: string): Promise<Candidate> {
    const foundToken = await this.tokenService.validateToken(token);
  
    const candidate = await this.candidateRepository.findOne({
      where: { email: foundToken.candidate.email },
    });
  
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }
  
    const encryptedPassword = await bcrypt.hash(resetPassword.password, 10);
    candidate.password = encryptedPassword;
  
    await this.candidateRepository.save(candidate);
  
    await this.tokenService.deleteToken(foundToken.id);
    // foundToken.candidate = candidate; 
    // await this.tokenService.saveToken(foundToken); 
    
    return candidate;
  }
    
  async forgotPassword(email: string) :Promise<string>{
    const validateCandidate=await this.candidateRepository.findOne({where:{email}});
    if(validateCandidate.password==null){
      throw new NotFoundException(" register set details first")
    }
    const token = uuid();
    const candidate = await this.candidateRepository.findOne({
      where: { email },
    });
    const name=candidate.first_name;
    if (!candidate) {
      throw new NotFoundException('Candidate not found');
    }

    const today = new Date();
    const expiryDate = new Date(
      today.setDate(today.getDate() + 15),
    );
    const stringDate=expiryDate.toISOString();
    await this.tokenService.createToken(token, candidate, expiryDate);
    await this.mailService.forgotPassword(name,email, token, stringDate);
    return "We have sent an email to the registered email address.Reset your password over there"
  }

  async candidateInfo(createCandidateDto: CreateCandidateDto) {
    const existingUser = await this.candidateRepository.findOne({
      where: { email: createCandidateDto.email },
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    if (createCandidateDto.password) {
      const hashedPassword = await bcrypt.hash(createCandidateDto.password, 10);
      createCandidateDto.password = hashedPassword;
    }
    createCandidateDto.status = Status.Active;
    Object.assign(existingUser, createCandidateDto);
    return this.candidateRepository.save(existingUser);
  }

  async login(loginCandidateDto: LoginUser): Promise<{ access_token: string }> {
    const { email, password } = loginCandidateDto;

    const candidate = await this.candidateRepository.findOne({
      where: { email },
    });

    if (!candidate) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, candidate.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: candidate.email, id: candidate.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async updateCandidate(
    id: string,
    updateCandidateDto: UpdateCandidateDto,
  ): Promise<Candidate> {
    const candidate = await this.candidateRepository.findOne({ where: { id } });

    if (!candidate) {
      throw new Error('Candidate not found');
    }

    Object.assign(candidate, updateCandidateDto);

    return await this.candidateRepository.save(candidate);
  }

  async deleteUser(id: string) {
    const candidate = await this.candidateRepository.findOne({ where: { id } });
    let status = true;

    if (!candidate) {
      throw new Error('Candidate not found');
    }

    const result = await this.candidateRepository.delete(id);
    if (result) {
      return status;
    }
    return (status = false);
  }

  async getCandidateById(id: string): Promise<Candidate> {
    const foundCandidate = await this.candidateRepository.findOne({
      where: { id },
    });
    if (!foundCandidate) {
      throw new NotFoundException('Candidate does not exist');
    }
    return foundCandidate;
  }

  async getCandidateByEmail(email: string): Promise<Candidate> {
    const foundCandidate = await this.candidateRepository.findOne({
      where: { email },
    });
    if (!foundCandidate) {
      throw new NotFoundException('Candidate does not exist');
    }
    return foundCandidate;
  }
}
