import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
  CamundaPlatformPropertiesProviderModule,
  CamundaPlatformTooltipProvider,
} from 'bpmn-js-properties-panel/dist/bpmn-js-properties-panel.umd.js';
import CustomPaletteProvider from './custom-palette-provider';
import CustomRenderer from './custom-renderer';
import { Orchestration } from '../list-model';
import { ListService } from '../list.service';

@Component({
  selector: 'app-orchestration',
  templateUrl: './orchestration.component.html',
  styleUrls: ['./orchestration.component.less']
})
export class OrchestrationComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) private canvasRef: ElementRef;
  @ViewChild('propertiesPanel', { static: true }) private propsPanelRef: ElementRef;
  private bpmnModeler: BpmnModeler;
  data: Orchestration = new Orchestration();
  deleteLoading = false;
  saveLoading = false;
  submitLoading = false;

  constructor(
    private listService: ListService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const camundaModdle = require('camunda-bpmn-moddle/resources/camunda.json');
    this.bpmnModeler = new BpmnModeler({
      container: this.canvasRef.nativeElement,
      propertiesPanel: {
        parent: this.propsPanelRef.nativeElement
      },
      additionalModules: [
        {
          __init__: ['customPaletteProvider', 'customRenderer'],
          customPaletteProvider: ['type', CustomPaletteProvider],
          customRenderer: ['type', CustomRenderer]
        },
        BpmnPropertiesPanelModule,
        BpmnPropertiesProviderModule,
        // CamundaPlatformPropertiesProviderModule,
      ],
      paletteContainer: '#palette',
      // moddleExtensions: {
        // camunda: camundaModdle
      // }
    });
    this.createNewDiagram();
  }

  createNewDiagram() {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL"
      xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI"
      xmlns:dc="http://www.omg.org/spec/DD/20100524/DC"
      xmlns:camunda="http://camunda.org/schema/1.0/bpmn"
      id="Definitions_1"
      targetNamespace="http://bpmn.io/schema/bpmn">
      <bpmn:process id="Process_1" isExecutable="true">
        <bpmn:startEvent id="StartEvent_1" />
      </bpmn:process>
      <bpmndi:BPMNDiagram id="BPMNDiagram_1">
        <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
          <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
            <dc:Bounds x="173" y="102" width="36" height="36" />
          </bpmndi:BPMNShape>
        </bpmndi:BPMNPlane>
      </bpmndi:BPMNDiagram>
    </bpmn:definitions>`;
    this.importXML(xml);
  }

  importXML(xml: string) {
    this.bpmnModeler.importXML(xml).then(({ warnings }) => {
      if (warnings && warnings.length) {
        console.warn('BPMN warnings', warnings);
      }
    }).catch(err => {
      console.error('BPMN import error', err);
    });
  }

  exportXML() {
    this.bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
      console.log(xml);
    });
  }

  handleDelete() {}

  handleSave() {
    this.bpmnModeler.saveXML({ format: true }).then(({ xml }) => {
      console.log('xml: ', xml);
    });
  }

  handleSubmit() {}
}
