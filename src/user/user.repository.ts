// // src/user/user.repository.ts

// import { Repository } from 'typeorm';
// import { User } from './entities/user.entity';
// import { IsNotEmpty, IsString } from 'class-validator';
 
// export class UserRepository extends Repository<User> {
//   // You can add custom methods here if needed
//   @IsString()
//   @IsNotEmpty()
//   phonenumber!: string;

//   @IsString()
//   @IsNotEmpty()
//   password!: string;
// }


// user.repository.ts
import { Entity, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Entity()
export class UserRepository extends Repository<User> {
  // Custom methods, if any
}
