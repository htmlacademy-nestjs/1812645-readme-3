import { TokenPayload, IUser } from '@project/shared/shared-types';

export function createJWTPayload(user: IUser): TokenPayload {
  return {
    sub: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
