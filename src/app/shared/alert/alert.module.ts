/**
 * Shared alert module
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        AlertComponent
    ],
    entryComponents: [
        AlertComponent
    ],
    exports: [
        AlertComponent
    ],
    providers: [
        AlertService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AlertModule {}
