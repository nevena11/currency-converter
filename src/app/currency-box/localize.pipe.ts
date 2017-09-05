/**
 * Currency box pipe for localize input string
 * Author: Nevena Jovanovic, nevenaj89@gmail.com
 * Date: 1.9.2017
 * Copyright: UNLICENSED (c) 2017 Nevena Jovanovic
 * Version: 1.0.0
 */
import { Pipe, PipeTransform } from '@angular/core';

// Pipe name
@Pipe({
    name: 'localize'
})

/**
 * Pipe class declaration
 */
export class LocalizePipe implements PipeTransform {

    /**
     * Convert objects into array
     *
     * @param input {string} Input
     * @param args {array} Optional params
     * @returns {string} Localize string
     */
    transform(input, args: string[]): string {
        return input.toLocaleString();
    }
}
