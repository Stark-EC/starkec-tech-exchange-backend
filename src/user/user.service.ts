// // src/user/user.service.ts
// import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from './dto/create-user.dto';
// import { SignInDto } from './dto/sign-in.dto';

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//     private jwtService: JwtService // Ensure JwtService is injected here
//   ) {}

//   // Register new user
//   async register(createUserDto: CreateUserDto): Promise<any> {
//     const { email, phonenumber } = createUserDto;
//     const existingUser = await this.userRepository.findOne({ where: [{ email }, { phonenumber }] });

//     if (existingUser) {
//       throw new ConflictException('User with this email or phone number already exists');
//     }

//     try {
//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
//       const newUser = this.userRepository.create({
//         ...createUserDto,
//         password: hashedPassword,
//       });
      
//       await this.userRepository.save(newUser);
//       return newUser;
//     } catch (error) {
//       console.error('Error during user registration:', error);
//       throw new InternalServerErrorException('Registration failed');
//     }
//   }

//   // // Sign in user with phone number and password
//   // async signIn(signInDto: SignInDto): Promise<any> {
//   //   const { phonenumber, password } = signInDto;
//   //   const user = await this.userRepository.findOne({ where: { phonenumber } });

//   //   if (!user || !(await bcrypt.compare(password, user.password))) {
//   //     throw new UnauthorizedException('Invalid phone number or password');
//   //   }

//   //   // Generate JWT token
//   //   const payload = { phonenumber: user.phonenumber, id: user.id };
//   //   const accessToken = this.jwtService.sign(payload);

//   //   return { accessToken, user };
//   // }


//   async signIn(signInDto: SignInDto): Promise<any> {
//     const { phonenumber, password } = signInDto;
//     const user = await this.userRepository.findOne({ where: { phonenumber } });
  
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       throw new UnauthorizedException('Invalid phone number or password');
//     }
  
//     const payload = { phonenumber: user.phonenumber, id: user.id };
  
//     // DEBUG: log the payload and check secret availability
//     console.log('Payload:', payload);
  
//     try {
//       const accessToken = this.jwtService.sign(payload);
//       console.log('AccessToken:', accessToken);
//       return { accessToken, user };
//     } catch (err) {
//       console.error('Error signing JWT:', err);  // Log detailed error for debugging
//       throw new InternalServerErrorException('JWT signing failed');
//     }
//   }
//   // Verify user by email (optional)
//   async verifyUser(email: string): Promise<User | null> {
//     return this.userRepository.findOne({ where: { email } });
//   }

//   // Find user by ID
//   async findById(id: number): Promise<User | null> {
//     return this.userRepository.findOne({ where: { id } });
//   }
// }



import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService // Ensure JwtService is injected here
  ) {}

  // Register new user
  async register(createUserDto: CreateUserDto): Promise<any> {
    const { email, phonenumber } = createUserDto;
    const existingUser = await this.userRepository.findOne({ where: [{ email }, { phonenumber }] });

    if (existingUser) {
      throw new ConflictException('User with this email or phone number already exists');
    }

    try {
      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const newUser = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
      });
      
      await this.userRepository.save(newUser);
      return newUser;
    } catch (error) {
      console.error('Error during user registration:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }

  // Sign in user with phone number and password
  async signIn(signInDto: SignInDto): Promise<any> {
    const { phonenumber, password } = signInDto;
    const user = await this.userRepository.findOne({ where: { phonenumber } });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid phone number or password');
    }
  
    const payload = { phonenumber: user.phonenumber, id: user.id };
  
    try {
      const accessToken = this.jwtService.sign(payload);
      return { accessToken, user };
    } catch (err) {
      console.error('Error signing JWT:', err);  // Log detailed error for debugging
      throw new InternalServerErrorException('JWT signing failed');
    }
  }

  // Verify user by email (optional)
  async verifyUser(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Find user by ID
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
