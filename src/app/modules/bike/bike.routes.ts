import { Router } from 'express';
import { BikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';

const router = Router();

router.post(
  '/', 
  validateRequest(BikeValidation.createBikeValidationSchema),
  BikeController.createBike
);

router.get('/', BikeController.getAllBikes);

router.get('/:bikeId', BikeController.getBikeById);

export const BikeRoutes = router; 