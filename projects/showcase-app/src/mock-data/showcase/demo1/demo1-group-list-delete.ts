import { RequestInfo } from 'angular-in-memory-web-api';
import { IDwMockData } from '@webdpt/framework/mock';
const mockResponse = require('../mock-response.json');
import { demo1GroupModel } from './demo1-group.model';

class Demo1DeleteGroupListMockData implements IDwMockData {

  get data(): any {
    const mockData = demo1GroupModel.mockData;

    return mockData;
  }

  getMethod(reqInfo: any): any {
    return reqInfo.collection;
  }

  postMethod(reqInfo: any): any {
    let params;
    try {
      params = JSON.parse(reqInfo.req.body);
    } catch (error) {
      params = reqInfo.req.body;
    }
    const collectionDb = <any>demo1GroupModel.mockData;
    const collection = [...collectionDb.master];

    const mockResp = <any>JSON.parse(JSON.stringify(mockResponse));
    mockResp.response = {
      'status': false,
      'description': '刪除失敗'
    };

    const paramsGroupIds: string[] = params.groupIds;
    if (paramsGroupIds.length) {
      for (let i = 0; i < paramsGroupIds.length; i++) {
        const idx = collection.findIndex((value: any) => {
          return value.groupId === paramsGroupIds[i];
        });
        if (idx >= 0) {
          collection.splice(idx, 1);
          mockResp.response.status = true;
          mockResp.response.description = ' 刪除成功';
        }
      }
    }
    collectionDb.master = collection;
    demo1GroupModel.mockData = collectionDb;

    return mockResp;
  }

  deleteMethod({ collection, collectionName, headers, id, url }: RequestInfo): any {
    return [];
  }

  putMethod({ collection, collectionName, headers, id, req, url }: RequestInfo): any {
    return [];
  }
}

export const demo1DeleteGroupList = new Demo1DeleteGroupListMockData();
