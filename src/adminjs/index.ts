import { brandingOptions } from './branding';
import { locale } from './locale';
import { adminJsResources } from './resources';
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { dashboardOptions } from './dashboard';
import { authenticationOptions } from './authentication';

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: brandingOptions,
  locale,
  dashboard: dashboardOptions
})

export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, authenticationOptions, null, {
  resave: false,
  saveUninitialized: false
})