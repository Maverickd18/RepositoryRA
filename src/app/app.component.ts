import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
    targets = [
    { name: 'Target 1', path: 'assets/targets/target1/image', type: 'box' },
    { name: 'Target 2', path: 'assets/targets/target2/image', type: 'text' },
    { name: 'Target 3', path: 'assets/targets/target3/image', type: 'sphere' }
  ];

  constructor() {}
}
