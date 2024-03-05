import { Request, Response, NextFunction } from "express";
import { CartController } from "../../presentation/controllers/CartController";
import { CartService } from "../../application/cartService";

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

        
        it('should add the product into the cart', async() => {
            (mockCartService.addToCartProduct as jest.Mock).mockResolvedValue(mockAddedProdcut);
            mockRequest.body = { cartDetails } as any;
            
            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);
            expect(mockCartService.addToCartProduct).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Item added successfully", data: mockAddedProdcut})
        });
        
        it("should handle the error while addin gproduct to the cart", async () => {
            const mockError = new Error('Some error occurred.');
            (mockCartService.addToCartProduct as jest.Mock).mockRejectedValue(mockError);

            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Internal server error"});
            expect(mockNextFunction).toHaveBeenCalledWith(mockError);
        })
    });

    describe("onViewCart", () => {
        const cartId = 1;
        const mockRequest = {} as Request;
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockCart = {
            "cart_item_cartId": cartId,
            "cart_item_productId": 3,
            "cart_item_quantity": 2,
            "product_productName": "Uptown Tshirt",
            "product_productImage": "uptown.jpg",
            "product_price": 2000.00
          }

        const mockNextFunction = jest.fn() as NextFunction;

        it('should view the cart', async () => {
            (mockCartService.viewCart as jest.Mock).mockResolvedValue(mockCart);
            mockRequest.params = { cartId } as any;
            await cartController.onViewCart(mockRequest, mockResponse, mockNextFunction);

            expect(mockCartService.viewCart).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Successfully view the cart", data: mockCart})
        });

        it('should handle the error while viewing the cart', async () => {
            const mockError = new Error('Some error occurred.');
            (mockCartService.addToCartProduct as jest.Mock).mockRejectedValue(mockError);

            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Internal server error"});
            expect(mockNextFunction).toHaveBeenCalledWith(mockError);
        })
    });
    describe('removeProductFromCart', () => {
        const mockCartId = 6;
        const mockProductId = 3;

        const mockRequest = {} as Request;
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockMessage = "Successfully Removed"
        const mockNextFunction = jest.fn() as NextFunction;

        it('should remove the product given productId and cartId', async () => {
            (mockCartService.removeProductFromCart as jest.Mock).mockResolvedValue(mockMessage);
            mockRequest.params = { mockCartId, mockProductId } as any;

            await cartController.onRemoveProductFromCart(mockRequest, mockResponse, mockNextFunction);
            expect(mockCartService.removeProductFromCart).toHaveBeenCalled()
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Successfully Removed", data: mockMessage})
        });

        it('should handle the error while removing the product', async () => {
            const mockError = new Error('Some error occurred.');
            (mockCartService.addToCartProduct as jest.Mock).mockRejectedValue(mockError);

            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Internal server error"});
            expect(mockNextFunction).toHaveBeenCalledWith(mockError);
        });
    });
});