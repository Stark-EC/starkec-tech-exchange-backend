export class UserResponseDto {
  id!: number;
  fullname!: string;
  businessname!: string;
  email!: string;
  password!: string;
  phonenumber?: string;
  isVerified!: boolean;
  isAdmin!: boolean;

  constructor(user?: any) {  // Add `?` to make it optional
    if (user) {
      this.id = user.id;
      this.fullname = user.fullname;
      this.businessname = user.businessname;
      this.email = user.email;
      this.password = user.password;
      this.phonenumber = user.phonenumber;
      this.isVerified = user.isVerified;
      this.isAdmin = user.isAdmin;
    }
  }
}
