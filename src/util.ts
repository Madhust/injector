/**
 * Specifies the utility methods used by d-injector
 */
export class Util {
    /**
     *  Function to check whether the provided element is undefined.
     *  @param element The element to be checked.
     *  @return boolean  
     */
    static isUndefined(element: Object): boolean {
        return typeof element === "undefined";
    }

    /**
     *  Function to check whether the provided element is null.
     *  @param element The element to be checked.
     *  @return boolean  
     */
    static isNull(element: Object): boolean {
        return element === null;
    }

    /**
    *  Function to check whether the provided element is function
    *  @param element The element to be checked
    *  @return boolean 
    */
    static isFunction(element: Object): element is Function {
        return typeof element === "function";
    }

    /**
     * Function to instantiate the Type using the provided constructor
     * @param construct Specifies the constructor of the class to be instantiated
     * @return Function
     */
    static instantiateConstructor(construct: { new (): Function } | Function): Object {
        return new (Function.prototype.bind.apply(construct));
    }

    /**
     * Function to get or add metadata to the class prototype.
     * @param prototype of the target class. 
     * @return T
     */
    static getOrCreateMetaData<T>(proto): T {
        let meta = proto._injectionmetadata;
        if (!meta) {
            proto._injectionmetadata = [];
            meta = proto._injectionmetadata;
        }
        return <T>meta;
    }

    /**
     * Function to iterate array of given type and invoke the callback for every entry.
     * @param elements Specifies the input array to be iterated.
     * @param callback Specifies the Function to be called for every entry.
     * @return void
     */
    static iterateArray<T>(elements: Array<T>, callback) {
        elements.forEach(element => {
            callback(<T>element);
        });
    }
}

/**
 * Interface to the metadata stored in the every entry class.
 */
export interface InjectionMeta {
    name: string;
    propName: string | symbol;
}
