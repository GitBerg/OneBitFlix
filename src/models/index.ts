import { User } from './User';
import { Category } from "./Category";
import { Course } from "./Course";
import { Episode } from "./Episode";

Category.hasMany(Course, {as: 'courses'})

Course.belongsTo(Category)
Course.hasMany(Episode, {as: 'episodes'})

Episode.belongsTo(Course)

export  {
    Category,
    Course,
    Episode,
    User
}