import client from './client';

//회원 인증에 피요한 API를 사용하기 쉽도록 함수화하여 파일로 작성
//로그인
export const login = ({ username, password }) =>
  client.post('/api/auth/login', { username, password });

//회원가입
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

//로그인 상태 확인
export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
