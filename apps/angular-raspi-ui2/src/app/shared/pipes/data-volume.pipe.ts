import { Pipe, PipeTransform } from '@angular/core';

const bit = 0.125;
const byte = 1;
const kilobit = 128;
const kilobyte = 1024;
const megabit = 131072;
const megabyte = 1048576;
const gigabit = 134217728;
const gigabyte = 1073741824;
const terabit = 137438945027.75;
const terabyte = 1099511627776;

type DataVolumeUnit = 'bits' | 'bytes' | 'kbit' | 'kb' | 'mbit' | 'mb' | 'gbit' | 'gb' | 'tbit' | 'tb';

@Pipe({
  name: 'dataVolume'
})
export class DataVolumePipe implements PipeTransform {

  transform(
    input: number,
    inputUnit: DataVolumeUnit = 'bytes',
    outputUnit?: DataVolumeUnit,
  ): string {
    const inputInBytes = this.normalize(input, inputUnit);

    switch (outputUnit) {
      case 'bits':
        return this.toBit(inputInBytes);
      case 'bytes':
        return this.toByte(inputInBytes);
      case 'kbit':
        return this.toKbit(inputInBytes);
      case 'kb':
        return this.toKB(inputInBytes);
      case 'mbit':
        return this.toMbit(inputInBytes);
      case 'mb':
        return this.toMB(inputInBytes);
      case 'gbit':
        return this.toGbit(inputInBytes);
      case 'gb':
        return this.toGB(inputInBytes);
      case 'tbit':
        return this.toTbit(inputInBytes);
      case 'tb':
        return this.toTB(inputInBytes);
      default: {
        if (input > terabyte) { return this.toTB(inputInBytes); }
        if (input > gigabyte) { return this.toGB(inputInBytes); }
        if (input > megabyte) { return this.toMB(inputInBytes); }
        if (input > kilobyte) { return this.toKB(inputInBytes); }
        if (input > byte) { return this.toByte(inputInBytes); }
      }
    }
    return '0';
  }

  normalize = (input: number, inputUnit: DataVolumeUnit): number => {
    switch (inputUnit) {
      case 'bits':
        return input * bit;
      case 'bytes':
        return input;
      case 'kbit':
        return input * kilobit;
      case 'kb':
        return input * kilobyte;
      case 'mbit':
        return input * megabit;
      case 'mb':
        return input * megabyte;
      case 'gbit':
        return input * gigabit;
      case 'gb':
        return input * gigabyte;
      case 'tbit':
        return input * terabit;
      case 'tb':
        return input * terabyte;
    }
  };

  private toBit = (bytes: number) => `${ Math.ceil(bytes * bit) } bits`;
  private toByte = (bytes: number) => `${ (bytes)} bytes`;

  private toKbit = (bytes: number) => `${ (bytes / kilobit).toFixed(2) } Kbit`;
  private toKB = (bytes: number) => `${ (bytes / kilobyte).toFixed(2) } KB`;

  private toMbit = (bytes: number) => `${ (bytes / megabit).toFixed(2) } Mbit`;
  private toMB = (bytes: number) => `${ (bytes / megabyte).toFixed(2) } MB`;

  private toGbit = (bytes: number) => `${ (bytes / gigabit).toFixed(2) } Gbit`;
  private toGB = (bytes: number) => `${ (bytes / gigabyte).toFixed(2) } GB`;

  private toTbit = (bytes: number) => `${ (bytes / terabit).toFixed(2) } Tbit`;
  private toTB = (bytes: number) => `${ (bytes / terabyte).toFixed(2) } TB`;
}
