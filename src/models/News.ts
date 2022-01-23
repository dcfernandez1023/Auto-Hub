import { json } from "../custom_types/json";
import { v4 as uuidv4 } from "uuid";

type News = {
    id: string;
    source: string;
    title: string;
    description: string;
    url: string;
    imageUrl: string;
}

const fromJson = (data: json): News => {
    return {
        id: data.id === undefined ? uuidv4().toString() : data.id,
        source: data.source === undefined ? "UNKNOWN" : data.source,
        title: data.title === undefined ? "None" : data.title,
        description: data.description === undefined ? "None" : data.description,
        url: data.url === undefined ? "" : data.url,
        imageUrl: data.imageUrl === undefined ? "" : data.imageUrl
    };
}

export { fromJson };
export type { News }