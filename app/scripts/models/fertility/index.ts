export interface FertilityData {
    testimonials: TestimonialItems[];
    ProgramInformation: ProgramInformation[];
    FrequentlyAskedQuestion: FAQ[];
    GoogleReviews: any;
    ClinicallyProven: ClinicallProven[];
}

export interface ClinicallProven {
    id: number;
    percentage: number;
    description: string;
}

export interface TestimonialItems {
    id: number;
    title: string;
    image: string;
    name: string;
    description: string;
}

export interface ProgramInformation {
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface FAQ {
    id: number;
    quetion: string;
    answer: string;
    extraPoint?: string[];
}