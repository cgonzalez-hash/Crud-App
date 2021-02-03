import { Component } from '@angular/core';
import { AuthorizeService } from "../../api-authorization/authorize.service";
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  
  constructor(private authService: AuthorizeService) {}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  authorized_ = this.authService.isAuthenticated();
}
