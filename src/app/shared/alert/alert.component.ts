/**
 * Alert component for displaying messages
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { Component, Input } from '@angular/core';

// Alert
import { AlertService } from './alert.service';
import { Alert } from './alert.model';

// Component
@Component({
    selector: 'app-alert',
    templateUrl: 'alert.component.html',
    styleUrls: [
        'alert.component.scss'
    ],
})

/**
 * Alert component
 */
export class AlertComponent {

    // Inputs
    @Input() alerts: Alert[];

    /**
     * Class constructor
     * @constructor
     */
    constructor(
        private alertService: AlertService
    ) {
        this.alerts = alertService.list();
    }

    /**
     * Reset and close messages
     */
    close() {
        this.alerts.length = 0;
    }
}
