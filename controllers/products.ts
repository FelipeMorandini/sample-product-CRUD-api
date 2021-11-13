import {Request, Response} from 'express'
import { Product, productModel } from '../models/product';
import { badRequest, internalServerError, notFound } from '../utils/errors';
import { validateNumber } from '../utils/utils';

const insertProduct = (req: Request, res: Response) => {
    
    {
        const product = req.body;
        if(!product) {
            return badRequest(res, 'Invalid product!')
        } else if(!product.name) {
            return badRequest(res, 'Please insert the product name!');
        } else if(!validateNumber(product.price)) {
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

const ListProducts = (req: Request, res: Response) => {
    productModel.listProducts()
        .then(products => {
            res.json(products)
        }).catch(err => internalServerError(res, err));
}

const getProduct = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        productModel.getProduct(id)
            .then((product) => {
                if(product) {
                    return res.json(product);
                } else {
                    return notFound(res);
                }
            }).catch(err => internalServerError(res, err));
    }
}

export const productController = {
    insertProduct,
    ListProducts,
    getProduct
}