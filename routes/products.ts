import { Router } from 'express';
import { productController } from '../controllers/products';

const productRouter = Router();
productRouter.post('/insert', productController.insertProduct);

export { productRouter };