import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { HttpService } from './http.service';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./window.service";

@Component({
  selector: 'crypto-main',
  template: `<div id="container-main">
                <div id="header">IB Cryptocurrency APP</div>
                <div id="viewer">
                   <div class="currency-block" *ngFor="let item of cryptoData">
                      <div [realsrc]="getIcoUrl(item.rank)" class="curr_ico"></div>
                      <div class="curr_name"><b>{{item.symbol}}</b> | {{item.name}}</div> 
                      <div class="curr_price">{{item.quotes[typeOfCurrency]["price"]}} $</div>
                      <div class="clear"></div>
                      <div class="curr_24h">24h: <div [colourPercent]="item.quotes[typeOfCurrency]['percent_change_24h']" [koef]="1" class="percent">{{item.quotes[typeOfCurrency]["percent_change_24h"]}} %</div></div>
                      <div class="curr_7d">7d: <div [colourPercent]="item.quotes[typeOfCurrency]['percent_change_7d']" koef="3" class="percent">{{item.quotes[typeOfCurrency]["percent_change_7d"]}} %</div></div>
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
  currenciesCount = 0;
  title = 'IB Crypto APP';
  uploadDelay = false;

  ngOnInit() {
    if(this.uploadCurrencies.call(this, 1, 100))
      this.currenciesCount+=100;
  }

  constructor(private httpService: HttpService, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {}

  @HostListener("window:scroll") loadMoreCurrencies(){
    let newCurrCount = 25;
    let listYOffset = this.window.pageYOffset;
    let scrollHeight = Math.max(this.document.body.scrollHeight, this.document.documentElement.scrollHeight,
      this.document.body.offsetHeight, this.document.documentElement.offsetHeight,
      this.document.body.clientHeight, this.document.documentElement.clientHeight);
    if(scrollHeight - listYOffset < 1000) {
      if(this.uploadCurrencies.call(this, this.currenciesCount+1, newCurrCount))
        this.currenciesCount+=newCurrCount;
    }
  }.bind(this);

  objToArrSortedByRank = function (obj: Object){
    let arr=[];
    for(let item in obj) {
      arr.push(obj[item]);
    }
    arr.sort((a,b)=>a["rank"]-b["rank"]);
    return arr;
  };

  getIcoUrl = function (rank: String) {
    if(rank!==undefined)
      return 'url(https://s2.coinmarketcap.com/static/img/coins/64x64/'+rank+'.png)';
  };

  uploadCurrencies = function(start: number, limit: number) {
    if(this.uploadDelay == false) {
      //we need delay to counter function multiple loading
      this.uploadDelay = true;
      setTimeout(function() {this.uploadDelay = false}.bind(this), 2000);

      if(Number(start)&&Number(limit)&&start>=1&&limit<=100&&limit>=1) {
        this.httpService.getData('https://api.coinmarketcap.com/v2/ticker/?start='+start+'&limit='+limit, function(data) {
          let newCurrs = this.objToArrSortedByRank(data.data);
          //this.cryptoData.push.apply(this.crypto, newCurrs);
          for(let i=0;i<newCurrs.length;i++) {
            this.cryptoData.push(newCurrs[i]);
          }
        }.bind(this));
        return true;
      }
      else {
        console.log("Wrong parameters('start' and 'limit') for uploading currencies");
        return false;
      }
    }
  };

}
