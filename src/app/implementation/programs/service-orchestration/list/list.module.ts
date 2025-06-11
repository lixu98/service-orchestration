import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrchestrationComponent } from './orchestration/orchestration.component';
import { ListService } from './list.service';
@NgModule({
  providers: [ListService],
  declarations: [
    ListComponent,
    OrchestrationComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    ListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ListModule { }
