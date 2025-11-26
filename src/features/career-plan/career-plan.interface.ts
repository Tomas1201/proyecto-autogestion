export interface CareerPlanCreationAttributes {
    careerId: string;
    cycleElectiveId: number;
}

export interface CareerPlanAttributes extends CareerPlanCreationAttributes {
    id: string;
}

export interface SubjectToPlanAttributes {
    subjectId: string;
    year: number;
    semester: 'first' | 'second' | 'annual';
    workload: number;
    isOptional: boolean;
}
