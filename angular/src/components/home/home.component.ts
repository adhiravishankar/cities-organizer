import { Component } from '@angular/core';
import { Store } from "@ngrx/store";

import { setTitle } from "../../actions/TitleAction";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(setTitle({ title: "Home" }));
  }

}
