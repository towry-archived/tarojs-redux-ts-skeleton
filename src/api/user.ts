import {
  post,
} from '../utils/fetch';
import { IResponse } from 'src/types/app';

export function login(code: string): Promise<IResponse> {
  return post('/login', {
    data: {
      code,
    }
  });
}
