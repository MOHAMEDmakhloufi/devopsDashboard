import { Build } from "./Build";

export interface Pipeline{
    "_class": string;
    "builds": Build[];
}