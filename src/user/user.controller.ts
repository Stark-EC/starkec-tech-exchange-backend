// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param, Req, UseGuards, InternalServerErrorException, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Request } from 'express';
import { JwtPayload } from '../auth/jwt-payload.interface'; // Import the interface
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Register a new user
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      return await this.userService.register(createUserDto);
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException('Registration failed');
    }
  }
  
  // Sign in with phone number and password
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return this.userService.signIn(signInDto);
  }
 
  // Verify user by email (optional)
  @Get('verify/:email')
  async verifyUser(@Param('email') email: string): Promise<UserResponseDto | null> {
    const user = await this.userService.verifyUser(email);
    if (!user) return null;
    const { password, ...userResponse } = user;
    return userResponse as UserResponseDto;
  }
 
  // Protected route to get user profile using JWT authentication
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: Request & { user: JwtPayload }): Promise<UserResponseDto> {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found in the database');
    }

    return new UserResponseDto(user);
  }
}
