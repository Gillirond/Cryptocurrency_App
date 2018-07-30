import {Directive, ElementRef, Renderer2, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[colourPercent]'
})
export class ColourPercentDirective implements OnInit{
  @Input('colourPercent') percent: number;
  @Input() koef: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2 ) { }

  ngOnInit() {
    if(String(this.percent).match(/^(-)*\d+(\.\d+)*$/)) {
      let fontWeight='normal';
      let colour;
      if(this.percent<=-5*this.koef) {
        colour="darkred";
        fontWeight = "bold";
      }
      else if(this.percent<=-2*this.koef)
        colour="orange";
      else if(this.percent<=2*this.koef)
        colour="black";
      else if(this.percent<=5*this.koef)
        colour="lightgreen";
      else {
        colour="green";
        fontWeight = "bold"; }

      this.renderer.setStyle(this.elementRef.nativeElement, "color", colour);
      this.renderer.setStyle(this.elementRef.nativeElement, "font-weight", fontWeight);
    }
  }
}
