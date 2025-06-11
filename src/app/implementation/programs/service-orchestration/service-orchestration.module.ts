import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceOrchestrationRoutingModule } from './service-orchestration-routing.module';

const programsModules = [

];

@NgModule({
  imports: [
    CommonModule,
    ServiceOrchestrationRoutingModule,
    ...programsModules
  ],
  declarations: []
})
export class ServiceOrchestrationModule { }
