import { Component } from '@angular/core';
import { TableColumn } from "@swimlane/ngx-datatable";

import { MetroService } from "../../apis/metro.service";
import { DisplayedMetro } from "../../interfaces/DisplayedMetro";
import { Metro } from "../../interfaces/Metro";
import {attachOrdinal} from "../../functions/getOrdinal";

@Component({
  selector: 'app-metros-table',
  templateUrl: './metros-table.component.html',
  styleUrls: ['./metros-table.component.scss']
})
export class MetrosTableComponent {
  metros?: DisplayedMetro[];

  columns: TableColumn[];

  constructor(private metroService: MetroService) {
    this.columns = [
      { name: 'Name', prop: 'Name' },
      { name: 'Metro', prop: 'ExtendedName' },
      { name: 'Population', prop: 'Population' },
      { name: 'Size', prop: 'MetroSizeRank' }
    ];
  }

  ngOnInit() {
    const numberFormatter = new Intl.NumberFormat('en-US');
    this.metroService.metros().subscribe(
      (response: Metro[]) => this.metros = response.map<DisplayedMetro>(
        (value: Metro) => ({ ...value, Population: numberFormatter.format(value.Population), MetroSizeRank: attachOrdinal(value.MetroSizeRank) })));
  }
}
