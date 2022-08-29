import { Category } from './../../models';
import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from './category';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    }
]