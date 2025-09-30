
export interface StudentStatusInterface {
    ChangeStatus(id: number, status: string): Promise<any>;
}
