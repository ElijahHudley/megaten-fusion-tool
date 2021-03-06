import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { SharedCompendiumModule } from '../compendium/compendium.module';
import { CompendiumRoutingModule } from './compendium-routing.module';

import { CompendiumComponent } from './components/compendium.component';
import { DemonListContainerComponent } from './components/demon-list.component';
import { SkillListContainerComponent } from './components/skill-list.component';
import { DemonEntryComponent, DemonEntryContainerComponent } from './components/demon-entry.component';
import { FusionChartContainerComponent } from './components/fusion-chart.component';

import { Dx2FissionTableComponent } from './components/dx2-fission-table.component';
import { Dx2FusionTableComponent } from './components/dx2-fusion-table.component';

import { FusionDataService } from './fusion-data.service';

import { COMPENDIUM_CONFIG, FUSION_DATA_SERVICE } from '../compendium/constants';
import { CompendiumConfig } from '../compendium/models';
import { RaceOrder, APP_TITLE } from './constants';

const compendiumConfig: CompendiumConfig = {
  appTitle: APP_TITLE,
  raceOrder: RaceOrder
};

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SharedCompendiumModule,
    CompendiumRoutingModule
  ],
  declarations: [
    CompendiumComponent,
    DemonEntryComponent,
    DemonEntryContainerComponent,
    DemonListContainerComponent,
    SkillListContainerComponent,
    FusionChartContainerComponent,
    Dx2FissionTableComponent,
    Dx2FusionTableComponent
  ],
  providers: [
    Title,
    FusionDataService,
    [{ provide: FUSION_DATA_SERVICE, useExisting: FusionDataService }],
    [{ provide: COMPENDIUM_CONFIG, useValue: compendiumConfig }]
  ]
})
export class CompendiumModule { }
