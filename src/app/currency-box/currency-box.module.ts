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

// Currency box
import { CurrencyBoxComponent } from './currency-box.component';
import { CreateArrayPipe } from './create-array.pipe';
import { LocalizePipe } from './localize.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        CurrencyBoxComponent,
        CreateArrayPipe,
        LocalizePipe
    ],
    entryComponents: [
        CurrencyBoxComponent
    ],
    exports: [
        CurrencyBoxComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class CurrencyBoxModule {}
