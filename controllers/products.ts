import {Request, Response} from 'express'
import { Product, productModel } from '../models/product';
import { badRequest, internalServerError, notFound } from '../utils/errors';
import { validateNumber, ok } from '../utils/utils';

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

const updateProduct = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
    
    {
        const product = req.body;

        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        } else if(!product) {
            return badRequest(res, 'Invalid product!')
        } else if(!product.name) {
            return badRequest(res, 'Please insert the product name!');
        } else if(!validateNumber(product.price)) {
            return badRequest(res, 'please inform the product price!')
        }

        const productSaved = await productModel.getProduct(id);
        if(!productSaved) {
            return notFound(res);
        }
    }

    const product = req.body as Product
    productModel.updateProduct(product)
        .then(product => {
            res.json(product)
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

const deleteProduct = (req: Request, res: Response) => {
    {
        const id = parseInt(req.params.id);
        if(!validateNumber(id)) {
            return badRequest(res, 'Invalid ID.');
        }

        productModel.deleteProduct(id)
            .then(() => ok(res)).catch(err => internalServerError(res, err));
    }
}

export const productController = {
    insertProduct,
    ListProducts,
    getProduct,
    deleteProduct,
    updateProduct
}