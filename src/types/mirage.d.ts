import { Server } from 'miragejs';

declare module 'miragejs' {
  interface Server {
    refreshData?: () => void; 
  }
}