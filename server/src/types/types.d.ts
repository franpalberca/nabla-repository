import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
      email: string;
      id: string;
  };
  auth?: {
      payload: {
          email: string;
          id: string;
      };
  };
}