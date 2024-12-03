import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES';
export const Roles = (
  ...roles: ['buyer' | 'seller', ...('buyer' | 'seller')[]]
) => SetMetadata(ROLES_KEY, roles);
