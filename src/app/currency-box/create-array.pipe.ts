/**
 * Currency box pipe for creating array from object properties
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */
import { Pipe, PipeTransform } from '@angular/core';

// Pipe name
@Pipe({
    name: 'createArray'
})

/**
 * Pipe class declaration
 */
export class CreateArrayPipe implements PipeTransform {

    /**
     * Convert objects into array
     *
     * @param input {object} Input
     * @param args {array} Optional params
     * @returns {string} New array
     */
    transform(input, args: string[]): any {
        let keys = [];

        // Iterate object
        Object.keys(input).forEach(key => {
            keys.push({
                key: key,
                value: input[key]
            });
        });

        // Return new array
        return keys;
    }
}
