import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

// square bracket tells angular to select it as an attribute on an element
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appHighlight') highlightColor: string = 'blue';
  // ElementRef allows to reference the element that has the directive
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.backgroundColor = this.defaultColor;
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }
  // @HostBinding is just an alternative to renderer
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;
  // the string is name of the event
  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
    this.backgroundColor = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColor;
  }
}
