import {Directive, HostListener, ElementRef, Inject, Input, OnInit} from '@angular/core';
import { DOCUMENT } from "@angular/platform-browser";
import { WINDOW } from "./window.service";

@Directive({
  selector: '[realsrc]'
})
export class ShowRealImgDirective implements OnInit{
  @Input("realsrc") imgRealSrc='';
  private loaded = false;

  @HostListener("window:scroll", []) loadIconsAftrScrollEvent() {
    if(!this.loaded) {
      if(this.isVisible(this.elementRef.nativeElement)) {
        this.elementRef.nativeElement.style.backgroundImage = this.imgRealSrc;
        this.loaded = true;
        console.log("scrolled");
      }
    }
  };

  ngOnInit() {
  }

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document, @Inject(WINDOW) private window: Window) {
  }

  isVisible = function(elem) {
    let coords = elem.getBoundingClientRect();

    let windowHeight = this.document.documentElement.clientHeight;

    let extendedTop = -2*windowHeight;
    let extendedBottom = 3 * windowHeight;

    // top visible || bottom visible
    let topVisible = coords.top > extendedTop && coords.top < extendedBottom;
    let bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

    return topVisible || bottomVisible;
  };

}
