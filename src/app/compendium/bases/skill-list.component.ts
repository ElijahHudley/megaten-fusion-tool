import {
  Component,
  Input,
  OnInit,
  AfterViewChecked
} from '@angular/core';

import { SortedTableComponent } from '../../shared/sorted-table.component';
import { Skill } from '../models';

export class SkillListComponent<TSkill extends Skill> extends SortedTableComponent<TSkill> implements OnInit, AfterViewChecked {
  @Input() elemOrder: { [elem: string]: number };
  @Input() inheritOrder: { [elem: string]: number };
  protected sortFuns: ((a: TSkill, b: TSkill) => number)[] = [];

  ngOnInit() {
      this.nextSortFuns();
  }

  ngAfterViewChecked() {
    this.matchColWidths();
  }

  nextSortFuns() {
    this.sortFuns = [
        (a, b) => (this.elemOrder[a.element] - this.elemOrder[b.element]) * 200 + a.rank - b.rank,
        (a, b) => (this.elemOrder[a.element] - this.elemOrder[b.element]) * 200 + a.rank - b.rank,
        (a, b) => a.name.localeCompare(b.name),
        (a, b) => b.cost - a.cost,
        (a, b) => a.rank - b.rank
    ];

    if (this.inheritOrder) {
      this.sortFuns.push(
        (a, b) => (this.inheritOrder[a.inherit] - this.inheritOrder[b.inherit]),
      );
    }
  }

  getSortFun(sortFunIndex: number): (a: TSkill, b: TSkill) => number {
    return this.sortFuns[sortFunIndex];
  }
}
