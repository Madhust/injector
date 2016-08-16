import {Util as _, InjectionMeta} from './util';
/**
 * Injector base to handle registeration and resolving dependencies 
 */
export class Injector {

    constructor(entries: { new (): Object }[]) {

        this.createEntry(entries);

        this.iterateAndCreateInstance();

        this.wireEntries();
    }

    /**
     * Static property to hold all the registered instances 
     * @default {}
     */
    public dependencies: { [x: string]: DependencyEntry } = {};

    /**
     * Function to get the entry of the dependency.
     * @param name Specifies the key name of the dependency. 
     * @return DependencyEntry
     */
    public getEntry(name: string): DependencyEntry {
        if (!this.checkAvailability(name))
            throw `The Dependency ${name} is not found`;
        return this.dependencies[name];
    }
    
    /**
     * Function to get the instance of the type registered in the container.
     * @param name Specifies the key name of the dependency. 
     * @return Object
     */
    public get(name: string): Object {
        return this.getEntry(name).instance;
    }

    /**
     * Function to create Dependency entry from the collection of Types.
     * @param entries Specifies the collection of Class types.
     */
    private createEntry(entries) {
        _.iterateArray<{ new (): Function }>(entries, (dep) => {
            this.dependencies[dep.injectionname] = {
                name: dep.injectionname,
                instance: null,
                type: dep
            }
        });
    }
    /**
     * Function to iterate and create instance from the collection of DependencyEntry.    
     */
    private iterateAndCreateInstance(): void {
        for (let name in this.dependencies) {
            if (_.isNull(this.dependencies[name].instance)) {
                this.register(this.dependencies[name]);
            }
        }
    }
    /**
     * Function to iterate and inject the dependencies for the target class.    
     */
    private wireEntries(): void {
        for (let name in this.dependencies) {
            this.resolve(this.dependencies[name]);
        }
    }
    /**
     * Function to register dependency
     * @param name Specifies the name of the dependency
     * @param object Specifies the type | object to be stored for injection
     * @return void 
     */
    private register(entry: DependencyEntry): void {
        if (_.isFunction(entry.type))
            entry.instance = _.instantiateConstructor(<{ new (): Function } | Function>entry.type);
    }
    /**
     * Function to check the availability of dependency in the container.
     * @param name Specifies the name of the dependency.
     * @return boolean    
     */
    private checkAvailability(name: string): boolean {
        return !_.isUndefined(this.dependencies[name]);
    }

    /**
     * Function to inject the dependencies for the target class. 
     * @param name Specifies the entry of the dependency.     
     */
    private resolve(entry: DependencyEntry) {
        let prop: InjectionMeta[] = _.getOrCreateMetaData<InjectionMeta[]>(entry.type.prototype);        
        prop.forEach((singles) => {        
            entry.instance[singles.propName] = this.dependencies[singles.name].instance;
        });        
    }

}

/**
 * Interface for dependency entry
 */
export interface DependencyEntry {
    name: string;
    instance: Object;
    type?: { new (): Function } | { new (): Object }
}
