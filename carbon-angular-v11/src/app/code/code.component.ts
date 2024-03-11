import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { Dropdown, ListItem } from 'carbon-components-angular';
import { DropdownTreelist } from 'carbon-fiber';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements AfterContentInit {
  items: ListItem[] = [
    { content: '0', selected: false },
    { content: '1', selected: false },
    { content: '2', selected: true }
  ];

  @ViewChild("tree", { static: true }) tree: Dropdown;
  @ViewChild("treelist", { static: true }) treelist: DropdownTreelist;

  ngAfterContentInit(): void {
    /**
     * This line in the Dropdown:
     *
     *     @ContentChild(AbstractDropdownView, { static: true }) view: AbstractDropdownView;
     *
     * is not picking up our DropdownTreelist even if it is a valid AbstractDropdownView,
     * we have to help the Dropdown with recognizing customized AbstractDropdownView.
     */
    this.tree.view = this.treelist;
  }
}
