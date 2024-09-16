// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { UserModule } from '../user/user.module';
// import { JwtStrategy } from './jwt.strategy';
// import { JwtAuthGuard } from './jwt-auth.guard';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     PassportModule,
//     ConfigModule.forRoot(), // Ensure ConfigModule is properly imported
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET') || 'fallbackSecret', // Ensure fallback is in place
//         signOptions: { expiresIn: '60m' },
//       }),
//     }),
//     UserModule,
//   ],
//   providers: [JwtStrategy, JwtAuthGuard],
//   exports: [JwtAuthGuard],
// })
// export class AuthModule {}


/// src/auth/auth.module.ts
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'fallbackSecret',
        signOptions: { expiresIn: '60m' },
      }),
    }),
    forwardRef(() => UserModule),  // forwardRef used to resolve circular dependency
  ],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtAuthGuard, JwtModule],  // Export JwtModule to make JwtService available
})
export class AuthModule {}
