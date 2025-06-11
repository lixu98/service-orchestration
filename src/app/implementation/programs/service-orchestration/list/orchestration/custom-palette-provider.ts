export default function CustomPaletteProvider(palette, create, elementFactory, translate) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.translate = translate;

  palette.registerProvider(this);
}

CustomPaletteProvider.$inject = [
  'palette',
  'create',
  'elementFactory',
  'translate'
];

// CustomPaletteProvider.prototype._createTask = function(event, type, options) {
//   console.log(event)
//   const shape = this.elementFactory.createShape({ type, ...options });
//   this.create.start(event, shape);
// };

CustomPaletteProvider.prototype.createDraggableHTML = function(type, group, title, options) {
  // const div = document.createElement('div');
  // div.className = 'custom-entry';
  // div.innerHTML = `<span>${title}</span>`;

  // div.addEventListener('dragstart', (event) => {
  //   console.log(11111111)
  //   const shape = this.elementFactory.createShape({ type, ...options });
  //   this.create.start(event, shape);
  // });

  // div.addEventListener('click', (event) => {
  //   console.log(2222)
  //   const shape = this.elementFactory.createShape({ type, ...options });
  //   this.create.start(event, shape);
  // });

  // return div.outerHTML;
  const div = document.createElement('div');
  div.className = 'custom-entry';
  div.textContent = this.translate(title);
  return div.outerHTML; // 仅返回纯净DOM元素
};

CustomPaletteProvider.prototype.getPaletteEntries = function(element) {
  const createAction = (type, group, title, options = {}) => {
    return {
      group,
      className: `custom-palette-btn custom-${type}`,
      title: String(this.translate(title)),
      action: {
        dragstart: (event) => {
          const shape = this.elementFactory.createShape({ type, ...options });
          this.create.start(event, shape);
        },
        click: (event) => {
          const shape = this.elementFactory.createShape({ type, ...options });
          this.create.start(event, shape);
        }
      }
    };
  };

  return {
    // 逻辑控制物料
    'logic-separator': { group: 'logic', separator: true, html: '<div class="custom-palette-group">逻辑控制物料</div>' },
    'create.start': createAction('bpmn:StartEvent', 'logic', '开始'),
    'create.end': createAction('bpmn:EndEvent', 'logic', '结束'),
    'create.loop': createAction('bpmn:SubProcess', 'logic', '循环', { isExpanded: true }),
    'create.gateway': createAction('bpmn:ExclusiveGateway', 'logic', '分支'),
    'create.merge': createAction('bpmn:ParallelGateway', 'logic', '合并'),
    'create.subprocess': createAction('bpmn:SubProcess', 'logic', '子流程', { isExpanded: true }),

    // 业务物料
    'business-separator': { group: 'business', separator: true, html: '<div class="custom-palette-group">业务物料</div>' },
    'create.esp': createAction('bpmn:ServiceTask', 'business', 'ESP服务', { customType: 'esp' }),
    'create.http': createAction('bpmn:ServiceTask', 'business', 'HTTP服务', { customType: 'http' }),
    'create.unit': createAction('bpmn:ServiceTask', 'business', '单位换算', { customType: 'unit' }),
    'create.validate': createAction('bpmn:ServiceTask', 'business', '校验', { customType: 'validate' }),

    // 技术物料
    'tech-separator': { group: 'tech', separator: true, html: '<div class="custom-palette-group">技术物料</div>' },
    'create.transform': createAction('bpmn:ScriptTask', 'tech', '数据转换', { customType: 'transform' }),
    'create.filter': createAction('bpmn:ScriptTask', 'tech', '数据过滤', { customType: 'filter' }),
    'create.group': createAction('bpmn:ScriptTask', 'tech', '数据分组', { customType: 'group' }),
    'create.lock': createAction('bpmn:ScriptTask', 'tech', '加锁', { customType: 'lock' }),
    'create.unlock': createAction('bpmn:ScriptTask', 'tech', '解锁', { customType: 'unlock' }),
    'create.variable': createAction('bpmn:ScriptTask', 'tech', '变量', { customType: 'variable' }),
  };
};
