/**
 * Main service
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Dependencies
import { STORAGE_KEY } from '../app.constants';
import { Injectable } from '@angular/core';
import { Http, Response, } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { STORAGE_STATE_KEY } from '../app.constants';
import { AlertService, CacheService } from '../shared';
import * as moment from 'moment';

// Main
import { Currency, CacheRates } from './main.model';
import { State } from '../currency-box/currency-box.model';

@Injectable()
export class MainService {
    timestamp: number;

    /**
     * Class constructor
     * @constructor
     */
    constructor(
        private http: Http,
        private alertService: AlertService,
        private cacheService: CacheService
    ) {
        this.timestamp = moment.utc().valueOf();
    }

    /**
     *
     * @returns {Observable<any>}
     */
    getDailyRates() {

        // Class instance
        const ci = this;

        // Check should we get data from browser storage or via http request
        if (ci.cacheService.check(STORAGE_KEY, ci.timestamp)) {
            return new Observable(observer => {
                observer.next(ci.cacheService.get(STORAGE_KEY));
                observer.complete();
            });
        } else {
            return ci.http.get('/exchange-rates/').map(
                (res: Response) => ci._processResponse(res.json()),
                (res: Response) => ci.alertService.add({
                    message: res.json().message
                })
            );
        }
    }

    /**
     * Set current boxes state in browser storage
     *
     * @private
     */
    saveState(leftBox: State, rightBox: State, date: string, timestamp: number): void {
        this.cacheService.set(STORAGE_STATE_KEY, {
            leftBox,
            rightBox,
            date,
            timestamp
        });
    }

    /**
     *
     * @private
     */
    private _processResponse(res: any): CacheRates {

        // Prepare cache data
        let cacheRates: CacheRates = {
            rates: this._filterResponse(res),
            date: res.hasOwnProperty('result') ? res.result.date : '',
            timestamp: this.timestamp
        };

        // Save filtered response into browser storage
        this.cacheService.set(STORAGE_KEY, cacheRates);

        // Return filtered rates
        return cacheRates;
    }


    /**
     *
     * @param res
     * @returns {any}
     */
    private _filterResponse(res: any): Currency {
        let exchangeRates: Currency = new Currency();

        // Check do we have proper data
        if (res.hasOwnProperty('result')) {

            // Get euro data
            if (res.result.hasOwnProperty('eur')) {
                exchangeRates.eur = this._formatValues(res.result.eur);
            }

            // Get usd data
            if (res.result.hasOwnProperty('usd')) {
                exchangeRates.usd = this._formatValues(res.result.usd);
            }

            // Manually add RSD to list
            exchangeRates.rsd = '';
        }

        // Return formatted values
        return exchangeRates;
    }

    /**
     *
     * @param rates
     * @returns {any}
     * @private
     */
    private _formatValues(rates) {
        Object.keys(rates).forEach(key => rates[key] =
            parseFloat(parseFloat(rates[key]).toFixed(2)));
        return rates;
    }

}
