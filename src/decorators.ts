import {Injector} from './injector';
import {Util as util, InjectionMeta} from './util';
/**
 * Property decorator to add metadata for injection in property level
 * @param name Specifies key of the object instance to be injected.
 */
export function AutoInject(name: string): PropertyDecorator {
    return (target, key) => {
        let prop: InjectionMeta[] = util.getOrCreateMetaData<InjectionMeta[]>(target);
        prop.push({
            name: name,
            propName: key
        });
    }
}
/**
 * Class decorator to add metadata for injection in class level
 * @param name Specifies key of the object instance to be injected.
 */
export function Injectable(name: string): ClassDecorator {
    return (target) => {        
        target.injectionname = name;//Update entry name; 
    };
}


