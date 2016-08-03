/**
 * Injector base to handle registeration and resolving dependencies 
 */
export class Injector {
    /**
     * Static property to hold all the registered dependencies 
     * @default null
     */
    public static dependencies: { [d: string]: Function | Object }

    constructor() {

    }
    /**
     * Function to register dependency
     * @param name Specifies the name of the dependency
     * @param object Specifies the type | object to be stored for injection 
     */
    register(name: string, object: Function | Object): void {

    }
}