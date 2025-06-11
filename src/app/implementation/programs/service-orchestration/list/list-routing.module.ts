import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list.component';
import { DwLanguageService } from '@webdpt/framework/language';
import { DwAuthGuardService } from '@webdpt/framework/auth';
import { OrchestrationComponent } from './orchestration/orchestration.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    data: {
      dwRouteData: {
        programId: 'list',
        dwAuthId: 'list'
      }
    },
    resolve: {
      transaction: DwLanguageService
    },
    children: [
      {
        path: "",
        pathMatch: "prefix",
        component: ListComponent,
        data: {
          dwRouteData: {
            dwAuthId: 'list',
          }
        }
      },
      {
        path: 'detail',
        component: OrchestrationComponent,
        data: {
          dwRouteData: {
            dwAuthId: 'orchestration'
          }
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
