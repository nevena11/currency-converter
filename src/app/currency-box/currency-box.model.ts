/**
 * Currency box data model
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */

/**
 * Data interface
 */
export class State {
    constructor(
        public box?: string,
        public currency?: string,
        public disabled?: string,
        public value?: number
    ) {}
}
