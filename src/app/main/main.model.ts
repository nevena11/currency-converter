/**
 * Main data model
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

// Currency box
import { State } from '../currency-box';

// Values constant
class CurrencyValue {
    constructor(
        public kup: number,
        public sre: number,
        public prod: number
    ) {}
}

/**
 * Currency interface
 */
export class Currency {
    constructor(
        public eur?: CurrencyValue,
        public usd?: CurrencyValue,
        public rsd?: string
    ) {}
}

/**
 * Rates interface
 */
export class CacheRates {
    constructor(
        public rates?: Currency,
        public date?: string,
        public timestamp?: number
    ) {}
}

/**
 * Box states interface
 */
export class CacheState {
    constructor(
        public leftBox?: State,
        public rightBox?: State,
        public date?: string,
        public timestamp?: number
    ) {}
}
