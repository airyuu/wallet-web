import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toEth'})
export class ToEthPipe implements PipeTransform {
  transform(value: number, length: number): number {
    let val = value * Math.pow(10, -length);
    return parseFloat(val.toFixed(6));
  }
}