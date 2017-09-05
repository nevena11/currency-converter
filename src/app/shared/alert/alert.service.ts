/**
 * Alert service
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { EventEmitter } from '@angular/core';

// Alert
import { Alert } from './alert.model';

/**
 *
 */
export class AlertService {

    // Public properties
    public messageAdded$: EventEmitter<Alert>;

    // Private properties
    private alertList: Alert[] = [];

    /**
     * Class constructor
     * @constructor
     */
    constructor() {
        this.messageAdded$ = new EventEmitter();
    }

    /**
     * Get list of messages
     *
     * @returns {Alert[]}
     */
    public list(): Alert[] {
        return this.alertList;
    }

    /**
     * Add message to list of alert messages
     *
     * @param {Alert} item
     */
    public add(item: Alert): void {
        this.alertList.push(item);
        this.messageAdded$.emit(item);
    }
}
