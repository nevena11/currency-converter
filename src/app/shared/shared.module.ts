/**
 * Shared module
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

// Shared services
import { CacheService } from './cache';

// Shared components
import { AlertModule, AlertComponent, AlertService } from './alert';

@NgModule({
    imports: [
        AlertModule
    ],
    providers: [
        CacheService,
        AlertService
    ],
    exports: [
        AlertComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule {}
