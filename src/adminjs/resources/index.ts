import { Category, Course } from './../../models';
import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from './category';
import { courseResourceOptions } from './course';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource:Course,
        options: courseResourceOptions
    }
]