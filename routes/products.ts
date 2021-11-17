import { Router } from 'express';
import { productController } from '../controllers/products';

const productRouter = Router();
productRouter.post('/insert', productController.insertProduct);
productRouter.get('/list', productController.ListProducts);
productRouter.get('/get/:id', productController.getProduct);
productRouter.delete('/delete/:id', productController.deleteProduct);
productRouter.put('/update/:id', productController.updateProduct);

export { productRouter };