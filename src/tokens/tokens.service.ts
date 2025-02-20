import { Injectable, NotFoundException , Inject , forwardRef, BadRequestException } from '@nestjs/common';
import { Tokens } from './tokens.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { Candidate } from 'src/candidate/candidate.entity';
import { promises } from 'dns';
import { create } from 'domain';
import { error } from 'console';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Tokens)
    private tokenRepository:Repository<Tokens>,


  ){
  }


async deleteToken(id:number){
  const foundToken=await this.tokenRepository.findOne({where:{id}})
  if(!foundToken){
    throw new NotFoundException("Token not found")
  }
  await this.tokenRepository.remove(foundToken);
}

async createToken(token: string, user: Candidate | Employee, expiryDate: Date) {
  console.log(user instanceof Employee)
  const existingToken=await this.tokenRepository.findOne({where:{candidate:{id:user.id}}});
  if(existingToken){
    await this.tokenRepository.remove(existingToken);
  }
    const tokenCreation = this.tokenRepository.create({
        token,
        candidate: user instanceof Candidate ? user : null,
        employee: user instanceof Employee ? user : null,
        expiryDate
      });

    return await this.tokenRepository.save(tokenCreation);
}

async saveToken(token:Tokens){
  await this.tokenRepository.save(token);
}

async getCandidate(id: string): Promise<Candidate> {
  const token = await this.tokenRepository.findOne({
    where: { candidate: { id } },
    relations: ['candidate'],
  });

  if (!token || !token.candidate) {
    throw new BadRequestException('No candidate found');
  }

  return token.candidate;
}
  
async validateToken(token: string): Promise<Tokens> {
  if(!token){
    throw new NotFoundException("Provide a token")
  }
  const existingToken = await this.tokenRepository.findOne({
    where: { token },
  });
  if (!existingToken) {
    throw new NotFoundException('Invalid token');
  }
  const currentDate = new Date();
  const isValid= existingToken.expiryDate > currentDate;
  if(!isValid){
    throw new BadRequestException("Token is no longer valid")
  }
  return existingToken;
}
 
}
