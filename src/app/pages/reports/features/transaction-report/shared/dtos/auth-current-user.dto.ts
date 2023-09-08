export interface AuthCurrentUserDto {
  attributes?: {
    email?: string;
    email_verified?: boolean;
    sub?: string;
  };
  username?: string;
}
