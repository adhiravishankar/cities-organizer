import { Component } from '@angular/core';

import { Metro } from "../../interfaces/Metro";
import { MetrosStore } from "../../stores/MetrosStore";
import {MetroService} from "../../apis/metro.service";

@Component({
  selector: 'app-metros-list',
  templateUrl: './metros-list.component.html',
  styleUrls: ['./metros-list.component.scss']
})
export class MetrosListComponent {
  metros?: Metro[];

  constructor(private metroService: MetroService) {
  }

  ngOnInit() {
    this.metroService.metros().subscribe(response => this.metros = response);
  }

}
