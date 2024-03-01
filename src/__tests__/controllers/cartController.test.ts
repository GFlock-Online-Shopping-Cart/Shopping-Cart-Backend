import { CartController } from "../../presentation/controllers/CartController";
import { CartService } from "../../application/cartService";
import { Request, Response, NextFunction } from "express";

describe('CartController', () => {
    let cartController: CartController;
    let mockCartService: CartService;

    beforeAll(() => {
        mockCartService = {
            addToCartProduct: jest.fn(),
            viewCart: jest.fn(),
            removeProductFromCart: jest.fn()
        } as unknown as CartService;
        cartController = new CartController(mockCartService);
    });

    describe('addToCartProduct', () => {
        const cartDetails = {
            "cartId": 6,
            "productId" : 3,
            "quantity" : 2
        }
        const mockRequest = {} as Request;
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockAddedProdcut = cartDetails;
        const mockNextFunction = jest.fn() as NextFunction;

        // const mockError = new Error('Some error occurred.');

        it('should add the product into the cart', async() => {
            (mockCartService.addToCartProduct as jest.Mock).mockResolvedValue(mockAddedProdcut);
            mockRequest.body = { cartDetails } as any;

            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);
            expect(mockCartService.addToCartProduct).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Item added successfully", data: mockAddedProdcut})
        })
    })

});