import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-complexity-level',
  templateUrl: './complexity-level.component.html',
  styleUrls: ['./complexity-level.component.less']
})
export class ComplexityLevelComponent implements OnInit {

  @Input() level: number = 1

  constructor() { }

  ngOnInit(): void {
  }

}
