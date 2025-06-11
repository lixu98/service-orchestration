import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

const HIGH_PRIORITY = 1500;

export default class CustomRenderer extends BaseRenderer {
  bpmnRenderer = null;
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);
    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // 只自定义我们关心的类型
    return (
      element.type === 'bpmn:ServiceTask' ||
      element.type === 'bpmn:ScriptTask' ||
      element.type === 'bpmn:StartEvent' ||
      element.type === 'bpmn:EndEvent' ||
      element.type === 'bpmn:ExclusiveGateway' ||
      element.type === 'bpmn:ParallelGateway' ||
      element.type === 'bpmn:SubProcess'
    );
  }

  drawShape(parentNode, element) {
    console.log(parentNode, element)
    const { customType } = element.businessObject;
    let bg = '#fff', label = element.businessObject.name || '节点';

    // 逻辑控制物料
    if (element.type === 'bpmn:StartEvent' || element.type === 'bpmn:EndEvent' || element.type === 'bpmn:ExclusiveGateway' || element.type === 'bpmn:ParallelGateway' || element.type === 'bpmn:SubProcess') {
      bg = 'linear-gradient(134deg, #A0A0FF 3%, #5D78FF 93%)';
    }
    // 业务物料
    else if (customType === 'esp' || customType === 'http' || customType === 'unit' || customType === 'validate') {
      bg = 'linear-gradient(129deg, #FFDE82 18%, #FDA752 86%)';
    }
    // 技术物料
    else if (customType === 'transform' || customType === 'filter' || customType === 'group' || customType === 'lock' || customType === 'unlock' || customType === 'variable') {
      bg = 'linear-gradient(129deg, #7be882 18%, #1ecb6b 86%)';
    }

    // 创建foreignObject
    const fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    fo.setAttribute('width', '108');
    fo.setAttribute('height', '36');

    // 创建HTML内容
    const html = document.createElement('div');
    html.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    html.className = 'custom-bpmn-node';
    html.style.width = '108px';
    html.style.height = '36px';
    html.style.display = 'flex';
    html.style.alignItems = 'center';
    html.style.borderRadius = '8px';
    html.style.background = '#fff';
    html.style.boxShadow = '0 2px 8px #0001';
    html.innerHTML = `
      <div class="custom-bpmn-icon" style="width:28px;height:28px;margin-left:6px;margin-right:8px;border-radius:6px;background:${bg};display:flex;align-items:center;justify-content:center;">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="17.91666603088379" height="17.91666603088379" viewBox="0 0 17.91666603088379 17.91666603088379"><g><path d="M2.62383,2.62383Q0.0000010000000000287557,5.24767,0,8.95833Q0,12.669,2.62383,15.2928Q5.24767,17.9167,8.95833,17.9167Q12.669,17.9167,15.2928,15.2928Q17.9167,12.669,17.9167,8.95833Q17.9167,5.24766,15.2928,2.62383Q12.669,0.0000010000000000287557,8.95833,0Q5.24767,0,2.62383,2.62383ZM3.50772,14.4089Q1.25,12.1512,1.25,8.95833Q1.25,5.76544,3.50772,3.50772Q5.76543,1.25,8.95833,1.25Q12.1512,1.25,14.4089,3.50772Q16.6667,5.76543,16.6667,8.95833Q16.6667,12.1512,14.4089,14.4089Q12.1512,16.6667,8.95833,16.6667Q5.76543,16.6667,3.50772,14.4089Z" fill-rule="evenodd" fill-opacity="1"/></g></svg>
      </div>
      <div class="custom-bpmn-label" style="font-size:14px;color:#333;">${label}</div>
    `;

    fo.appendChild(html);
    parentNode.appendChild(fo);
    return fo;
  }
}
(CustomRenderer as any).$inject = ['eventBus', 'bpmnRenderer'];