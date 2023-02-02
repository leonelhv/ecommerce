import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Output() eventClickLink = new EventEmitter<void>();

  onEventClickLink() {
    this.eventClickLink.emit();
  }
}
