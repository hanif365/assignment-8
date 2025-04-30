import { Router } from "express";
import { CustomerRoutes } from "../modules/customer/customer.routes";
import { BikeRoutes } from "../modules/bike/bike.routes";

const router = Router();

export interface Routes {
  path: string;
  route: Router;
}

const moduleRoutes: Routes[] = [
  {
    path: '/customers',
    route: CustomerRoutes
  },
  {
    path: '/bikes',
    route: BikeRoutes
  }
];

// register all module routes dynamically
moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
