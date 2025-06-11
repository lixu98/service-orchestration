import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { APP_SYSTEM_CONFIG, DW_AUTH_TOKEN, DwDapHttpClient, DwSystemConfigService } from '@webdpt/framework';
import { Observable } from 'rxjs';

@Injectable()
export class ListService {
  apiUrl: string;
  eocUrl: string;
  uibotUrl: string;
  smartDataUrl: string;
  opmUrl: string;
  content: any;
  executeContext: any;
  isLoadStatus: boolean = true;
  constructor(
    @Inject(DW_AUTH_TOKEN) protected authToken: any,
    @Inject(APP_SYSTEM_CONFIG) protected systemConfig: any,
    private http: DwDapHttpClient,
    private configService: DwSystemConfigService,
    private translateService: TranslateService
  ) {
    this.configService.get('bctUrl').subscribe((url: string) => {
      this.apiUrl = url + '/bct';
    });
  }
  getHeader() {
    const data = localStorage.getItem('DwUserInfo')
    const authToken = JSON.parse(data);
    return authToken.token ? { token: authToken.token } : {};
  }
  // 查询
  public getDetail(params): Observable<any> {
    return this.http.post(`${this.apiUrl}/orchestration/detail/get`, params, {
      headers: this.getHeader(),
    });
  }
  // 更新
  public updateDetail(params): Observable<any> {
    return this.http.put(`${this.apiUrl}/orchestration/detail`, params, {
      headers: this.getHeader(),
    });
  }
  // 删除
  public deleteDetail(params): Observable<any> {
    return this.http.post(`${this.apiUrl}/orchestration/detail/delete`, params, {
      headers: this.getHeader(),
    });
  }
}
