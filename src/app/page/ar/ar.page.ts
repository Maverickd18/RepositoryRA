import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ar',
  templateUrl: './ar.page.html',
  styleUrls: ['./ar.page.scss'],
  standalone: false,
})
export class ArPage implements OnInit {

      targets = [
    { name: 'Target 1', path: 'assets/targets/target1/image', type: 'box' },
    { name: 'Target 2', path: 'assets/targets/target2/image', type: 'text' },
    { name: 'Target 3', path: 'assets/targets/target3/image', type: 'sphere' }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
