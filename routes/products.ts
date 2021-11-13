import { Router } from 'express';
import { productController } from '../controllers/products';

const productRouter = Router();
productRouter.post('/insert', productController.insertProduct);
productRouter.get('/list', productController.ListProducts)

export { productRouter };