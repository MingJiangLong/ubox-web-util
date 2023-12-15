
export type KeyValue<T = any> = Record<string, T>
export type ArrayItem<T extends Array<any>> = T extends Array<infer E> ? E : any