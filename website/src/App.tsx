import { Login } from './pages/Login';
import { createContext } from 'react';
import { API } from './apis/API';

export function App() {
  const api = new API(process.env.BASE_URL);
  return (<Login />);
}
