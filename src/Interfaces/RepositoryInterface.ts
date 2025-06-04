export interface RepositoryInterface<T> {
    getAll(): Promise<T[]>;
    getById(id: number): Promise<T | null>;
    create(item: T): Promise<T>;
    update(id: number, item: T): Promise<T | null>;
    delete(id: number): Promise<boolean>;
    exists(id: number): Promise<boolean>;
    count(): Promise<number>;
    findByField(field: keyof T, value: any): Promise<T[]>;
    findOneByField(field: keyof T, value: any): Promise<T | null>;
    findAllByFields(fields: Partial<T>): Promise<T[]>;
    findOneByFields(fields: Partial<T>): Promise<T | null>;
    findAndCountByFields(fields: Partial<T>): Promise<{ items: T[]; count: number }>;
    findByCondition(condition: (item: T) => boolean): Promise<T[]>;
}