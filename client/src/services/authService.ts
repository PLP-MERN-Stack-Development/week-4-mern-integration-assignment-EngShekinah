import api from './api';

class AuthService {
  async login(email: string, password: string) {
    return api.post('/auth/login', { email, password });
  }

  async register(email: string, password: string, name: string) {
    return api.post('/auth/register', { email, password, name });
  }
}

export default new AuthService();