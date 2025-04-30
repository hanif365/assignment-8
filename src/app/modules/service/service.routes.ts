import { Router } from 'express';
import { ServiceController } from './service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceValidation } from './service.validation';

const router = Router();

router.post(
  '/', 
  validateRequest(ServiceValidation.createServiceValidationSchema),
  ServiceController.createService
);

router.get('/', ServiceController.getAllServices);

router.get('/status', ServiceController.getOverdueServices);

router.get('/:serviceId', ServiceController.getServiceById);

router.put(
  '/:serviceId/complete', 
  validateRequest(ServiceValidation.completeServiceValidationSchema),
  ServiceController.completeService
);

export const ServiceRoutes = router; 