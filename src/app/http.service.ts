import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  getData(path: string, callback) {
    return this.httpClient.get(path).subscribe(callback);
  }
}
