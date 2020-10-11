export interface Extraction {
    id: string;
    extractionTime: number;
    extractionDate: Date;
    weightIn: number;
    weightOut: number;
    grindSize: string;
    rating?: number
}