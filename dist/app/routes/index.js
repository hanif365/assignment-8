"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_routes_1 = require("../modules/customer/customer.routes");
const bike_routes_1 = require("../modules/bike/bike.routes");
const service_routes_1 = require("../modules/service/service.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/customers',
        route: customer_routes_1.CustomerRoutes
    },
    {
        path: '/bikes',
        route: bike_routes_1.BikeRoutes
    },
    {
        path: '/services',
        route: service_routes_1.ServiceRoutes
    }
];
// register all module routes dynamically
moduleRoutes.forEach(({ path, route }) => router.use(path, route));
exports.default = router;
