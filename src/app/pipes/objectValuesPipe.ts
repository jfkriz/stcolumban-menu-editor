import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'objectValues', pure: true })
export class ObjectValuesPipe implements PipeTransform {
    transform(value: any, args: any[] = null): any {
        const returnArray = [];

        Object.keys(value).forEach((entryKey) => {
            returnArray.push({
                key: entryKey,
                val: value[entryKey]
            });
        });
        return returnArray;
    }
}
