import { GoogleReviews } from "../product/productv2";

export interface HVData {
    ClinicalProven: ClinicalProven[],
    BackedByScience: BackedByScience[],
    TestimonialsList: TestimonialItems[],
    ProgramInformation: ProgramInformation[],
    ProductInformation: ProductInformation[],
    AwardWinningClinicallyProven: AwardWinningClinicallyProven[],
    GoogleReviews: GoogleReviews,
    FrequentlyAskedQuestion: FAQ[]
}
export interface ClinicalProven {
    id: number;
    percentage: number;
    description: string;
}

export interface BackedByScience {
    id: number;
    percentage: string;
    sectionTitle: string;
    articles: articles[];
}

export interface articles {
    title: string;
    src: string;
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

export interface ProductInformation{
    id: number;
    months: string;
    information: string;
    image: string
}

export interface AwardWinningClinicallyProven{
    id: number;
    heading: string;
    subHeading: string;
    image: string;
}