import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'crypto-main',
  template: `<div id="container-main">
                <div id="header">IB Cryptocurrency APP</div>
                <div id="viewer">
                   <div class="currency-block" *ngFor="let item of cryptoData">
                      <div class="curr_ico" [ngStyle]="{'background-image':getIcoUrl(item.rank), 'width':'64', 'height':'64'}"></div>
                      <div class="curr_name"><b>{{item.symbol}}</b> | {{item.name}}</div> 
                      <div class="curr_price">{{item.quotes[typeOfCurrency]["price"]}} $</div>
                      <div class="clear"></div>
                      <div class="curr_24h" [ngStyle]="{'color':colorOfPercentDay(item.quotes[typeOfCurrency]['percent_change_24h'])}">24h: <div class="percent">{{item.quotes[typeOfCurrency]["percent_change_24h"]}} %</div></div>
                      <div class="curr_7d" [ngStyle]="{'color':colorOfPercentWeek(item.quotes[typeOfCurrency]['percent_change_7d'])}">7d: <div class="percent">{{item.quotes[typeOfCurrency]["percent_change_7d"]}} %</div></div>
                      <div class="clear"></div>
                   </div>
                </div>
             </div>`,
  styleUrls: ['./app.component.css'],
  providers: [ HttpService ]
})
export class AppComponent implements OnInit{
  typeOfCurrency: string = 'USD';
  cryptoData = [];
  currenciesCount = 100;
  title = 'IB Crypto APP';
  constructor (private httpService: HttpService) {}

  ngOnInit() {
    this.uploadCurrencies.call(this, 1, 100);
  }

  objToArrSortedByRank = function (obj: Object){
    let arr=[];
    for(let item in obj) {
      arr.push(obj[item]);
    }
    arr.sort((a,b)=>a["rank"]-b["rank"]);
    return arr;
}

  getIcoUrl = function (rank: String) {
    if(rank!==undefined)
      return 'url(https://s2.coinmarketcap.com/static/img/coins/64x64/'+rank+'.png';
  }

  uploadCurrencies = function(start: number, limit: number) {
    if(Number(start)&&Number(limit)&&start>=1&&limit<=100&&limit>=1) {
      this.httpService.getData('https://api.coinmarketcap.com/v2/ticker/?start='+start+'&limit='+limit, function(data) {
        this.cryptoData = this.objToArrSortedByRank(data.data);
        console.log(this.cryptoData);
      }.bind(this));
    }
    else
      console.log("Wrong parameters('start' and 'limit') for uploading currencies");

  };

  colorOfPercentDay = function(percent: number) {
    let colour="";
    if(percent<=-5)
      colour="darkred";
    else if(percent<=-2)
      colour="orange";
    else if(percent<=2)
      colour="black";
    else if(percent<=5)
      colour="lightgreen";
    else colour="green";
    return colour;
  };

  colorOfPercentWeek = function(percent: number) {
    let colour="";
    if(percent<=-15)
      colour="darkred";
    else if(percent<=-6)
      colour="orange";
    else if(percent<=6)
      colour="black";
    else if(percent<=15)
      colour="lightgreen";
    else colour="green";
    return colour;
  };
}
