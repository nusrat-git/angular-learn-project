import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myCustom',
})
export class MyCustomPipe implements PipeTransform {
  transform(value: string, prefix: string): string {
    return prefix + value;
  }
}
