// 编排
export class Orchestration {
  id?: string;
  name: string;
  code: string;
  xml?: string;
  constructor(data?) {
    return {
      ...data,
      name: '销售订单合同',
      code: 'sales contract-22',
    };
  }
}

// 物料列表
export const materialList = [
  {
    name: '逻辑控制物料',
    list: [
      {
        name: '开始',
      },
    ],
  },
];
