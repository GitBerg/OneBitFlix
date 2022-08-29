import { Category, Course, Episode } from './../../models';
import { ResourceWithOptions } from "adminjs";
import { categoryResourceOptions } from './category';
import { courseResourceOptions } from './course';
import { episodeResourceFeatures, episodeResourceOptions } from './episode';

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource:Course,
        options: courseResourceOptions
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    }
]