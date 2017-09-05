/**
 * Main component
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { Component, OnInit } from '@angular/core';
import { AlertService, CacheService } from '../shared';
import { STORAGE_STATE_KEY } from '../app.constants';
import * as moment from 'moment';

// Main
import { MainService } from './main.service';
import { CacheRates, CacheState } from './main.model';

// Currency box
import { State } from '../currency-box';
import {Observable} from "rxjs/Observable";

// Main component declaration
@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
        './main.component.scss'
    ]
})

/**
 * Main component class
 */
export class MainComponent implements OnInit {

    // Public properties
    exchangeRates: CacheRates;
    leftBox: State;
    rightBox: State;

    /**
     * Class constructor
     * @constructor
     */
    constructor(
        private alertService: AlertService,
        private service: MainService,
        private cacheService: CacheService
    ) {
        this.leftBox = new State();
        this.rightBox = new State();
    }

    /**
     * Initialization lifecycle hook
     */
    ngOnInit() {

        // Get the data
        this.loadAll();
    }

    /**
     * Get all exchange rates data
     *
     * @returns {Subscription}
     */
    loadAll() {
        return this.service.getDailyRates().subscribe(
            (res: CacheRates) => {
                this.exchangeRates = res;
                this.initState();
            },
                (res: any) => this.onAlert(res)
        );
    }

    /**
     * Set initial state on both select boxes
     */
    initState(): void {
        let storageData: CacheState;

        // Check do we have previous state in browser storage
        if (this.cacheService.check(STORAGE_STATE_KEY, moment.utc().valueOf())) {
            storageData = this.cacheService.get(STORAGE_STATE_KEY);
            this.leftBox = storageData.leftBox;
            this.rightBox = storageData.rightBox;
        } else {
            this.resetState();
        }
    }

    /**
     * Reset state on both select boxes
     */
    resetState(): void {

        // Left box
        this.leftBox = {
            box: 'left',
            currency: 'eur',
            disabled: 'rsd',
            value: 1
        };

        // Right box
        this.rightBox = {
            box: 'right',
            currency: 'rsd',
            disabled: 'eur',
            value: this._calculateExchange('eur', 1)
        };

        // Save current state
        this.cacheService.remove(STORAGE_STATE_KEY);
    }

    /**
     * Update states based on selected currencies
     *
     * @param $event {State} Box state object
     */
    updateState($event: State): void {
        let state: State = Object.assign({}, $event);

        // Check if value is empty
        if (!state.value) {
            state.value = 1;
        }

        // Calculate exchange based on box origin
        switch (state.box) {
            case 'left':
                this.leftBox.currency = state.currency;
                this.rightBox.value = this._calculateExchange(state.currency, state.value, this.rightBox.currency);
                this.rightBox.disabled = state.currency;
                break;
            default:
                this.rightBox.currency = state.currency;
                this.leftBox.value = this._calculateExchange(state.currency, state.value, this.leftBox.currency);
                this.leftBox.disabled = state.currency;
                break;
        }

        // Save current state
        this.service.saveState(this.leftBox, this.rightBox, this.exchangeRates.date, moment.utc().valueOf());
    }

    /**
     * Switch states of currency boxes
     */
    switchState(): void {
        let leftBoxCopy = Object.assign({}, this.leftBox);
        this.leftBox = Object.assign({}, this.rightBox);
        this.leftBox.box = 'left';
        this.rightBox = leftBoxCopy;
        this.rightBox.box = 'right';

        // Save current state
        this.service.saveState(this.leftBox, this.rightBox, this.exchangeRates.date, moment.utc().valueOf());
    }

    /**
     * Calculate exchange rate
     *
     * @param currency {string} Selected string
     * @param value {number} Selected value
     * @param oppositeCurrency {string} Opposite box value
     * @returns {number} Calculated value
     * @private
     */
    private _calculateExchange(currency: string, value: number, oppositeCurrency?: string): number {
        let convertedValue: number;

        // Calculation condition
        if (currency === 'rsd' && oppositeCurrency) {
            convertedValue = value / this.exchangeRates.rates[oppositeCurrency].sre;
        } else if (this.leftBox.currency !== 'rsd' && this.rightBox.currency !== 'rsd' && oppositeCurrency) {
            convertedValue = (this.exchangeRates.rates[currency].sre * value) / this.exchangeRates.rates[oppositeCurrency].sre;
        } else {
            convertedValue = this.exchangeRates.rates[currency].sre * value;
        }

        // Return calculated value as float number
        return parseFloat(convertedValue.toFixed(2).toLocaleString());
    }

    /**
     * Alert handler
     *
     * @param message {String} Message
     */
    private onAlert(message: string): void {
        this.alertService.add({message});
    }
}
