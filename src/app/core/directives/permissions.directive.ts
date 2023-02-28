import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {AuthFacade} from "../../facades/auth.service";

@Directive({
  selector: '[appPermissions]',
  standalone: true,
})
export class PermissionsDirective implements AfterViewInit{

  @Input() appPermissions: string[] = [];

  constructor(
    private authFacade: AuthFacade,
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  hasPermission(): boolean {
    const userPermissions = this.authFacade.permissions;

    return userPermissions.some(permission => this.appPermissions.includes(permission));
  }

  ngAfterViewInit(): void {
    console.log(this.elementRef.nativeElement)
    console.log(this.hasPermission())
    if (!this.hasPermission()) {
      this.elementRef.nativeElement.remove();
    }
  }



}
