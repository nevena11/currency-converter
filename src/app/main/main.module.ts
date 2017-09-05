/**
 * Main module
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared';
import { MainComponent } from './main.component';
import { MainService } from './main.service';
import { CurrencyBoxModule } from '../currency-box';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        CurrencyBoxModule
    ],
    declarations: [
        MainComponent
    ],
    entryComponents: [
        MainComponent
    ],
    providers: [
        MainService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MainModule {}
