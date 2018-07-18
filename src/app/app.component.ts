import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'crypto-main',
  template: `<div>
                <div id="header">IB Cryptocurrency APP</div>
                <div id="viewer">
                   <div *ngFor="let item of cryptoData">
                      <h4>{{item.symbol}} | {{item.name}}</h4>
                      <h5>24h: {{item.quotes[typeOfCurrency]["percent_change_24h"]}} | 7d: {{item.quotes[typeOfCurrency]["percent_change_7d"]}}</h5>
                   </div>
                </div>
             </div>`,
  styleUrls: ['./app.component.css'],
  providers: [ HttpService ]
})
export class AppComponent implements OnInit{
  typeOfCurrency: string = 'USD';
  cryptoData = {};
  title = 'IB Crypto APP';
  constructor (private httpService: HttpService) {}

  ngOnInit() {
    this.httpService.getData('https://api.coinmarketcap.com/v2/ticker/', function(data) {
      console.log(data);
      this.cryptoData = this.objToArrSortedByRank(data.data);
      console.log(this.cryptoData);
    }.bind(this));
  }

  objToArrSortedByRank = function (obj: Object){
    let arr=[];
    for(let item in obj) {
      arr.push(obj[item]);
    }
    arr.sort((a,b)=>a["rank"]-b["rank"]);
    return arr;
}
}
