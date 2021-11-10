import {Request, Response} from 'express'
import { Product, productModel } from '../models/product';
import { badRequest, internalServerError } from '../utils/errors';

const insertProduct = (req: Request, res: Response) => {
    
    {
        const product = req.body;
        if(!product) {
            return badRequest(res, 'Invalid product!')
        } else if(!product.name) {
            return badRequest(res, 'Please insert the product name!');
        } else if(!parseFloat(product.price)) {
            return badRequest(res, 'please inform the product price!')
        }
    }

    const product = req.body as Product
    productModel.insertProduct(product)
        .then(id => {
            res.json({
                id
            })
    }).catch(err => internalServerError(res, err))
}

export const productController = {
    insertProduct
}