import { Collections } from "../models/home";

export interface ICategories{
    name: string,
    image: string,
    handle: string,
    type: string
    goals?: IGoals[];
}

export interface IGoals{
    name: string,
    image: string,
    handle: string,
    type: string
}

export interface IConcernCategoryResponse {
    data: {
        collections: Collections[]
    }
}