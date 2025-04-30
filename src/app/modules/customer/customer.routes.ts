import { Router } from 'express';
import { CustomerController } from './customer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CustomerValidation } from './customer.validation';

const router = Router();

router.post(
  '/', 
  validateRequest(CustomerValidation.createCustomerValidationSchema),
  CustomerController.createCustomer
);

router.get('/', CustomerController.getAllCustomers);

router.get('/:customerId', CustomerController.getCustomerById);

router.put(
  '/:customerId', 
  validateRequest(CustomerValidation.updateCustomerValidationSchema),
  CustomerController.updateCustomer
);

router.delete('/:customerId', CustomerController.deleteCustomer);

export const CustomerRoutes = router;
