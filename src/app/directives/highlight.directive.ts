import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input
} from "@angular/core";

@Directive({
  selector: "[appHighlight]"
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input("appHighlight") highlightColor: string = "blue";
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
  }
  @HostBinding("style.backgroundColor") backgroundColor: string = this
    .defaultColor;
  @HostListener("mouseenter") mouseover(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "blue"
    // );
    this.backgroundColor = this.highlightColor;
  }
  @HostListener("mouseleave") mouseleave(eventData: Event) {
    // this.renderer.setStyle(
    //   this.elRef.nativeElement,
    //   "background-color",
    //   "transparent"
    // );
    this.backgroundColor = this.defaultColor;
  }
}
