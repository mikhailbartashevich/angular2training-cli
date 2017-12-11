import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDynamicBorder]'
})
export class DynamicBorderDirective implements OnInit {

  @Input() createdDateMs: number;

  constructor(private element: ElementRef) {}

  public ngOnInit(): void {
    this.element.nativeElement.style.borderColor = this.getBorderColor_();
  }

  private getBorderColor_(): string {
    const createdDate = new Date(this.createdDateMs);
    const currentDate = new Date();
    const lastTwoWeeks = new Date();
    lastTwoWeeks.setDate(currentDate.getDate() - 14);
    let color = this.element.nativeElement.style.borderColor;
    if (createdDate < currentDate && createdDate >= lastTwoWeeks) {
      color = 'green';
    } else if (createdDate > currentDate) {
      color = 'blue';
    }
    return color;
  }

}
