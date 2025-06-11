import { Routes } from '@angular/router';

export const IMPLEMENTATION_ROUTES: Routes = [
  {
    path: '', // 首頁
    pathMatch: 'prefix',
    loadChildren: (): Promise<any> => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'orchestration',
    pathMatch: 'prefix',
    loadChildren: (): any => import('./programs/service-orchestration/service-orchestration.module').then(m => m.ServiceOrchestrationModule)
  }
];
