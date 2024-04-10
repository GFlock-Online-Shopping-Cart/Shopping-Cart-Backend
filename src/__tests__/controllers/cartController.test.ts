import { Response, NextFunction } from "express";
import { CartController } from "../../presentation/controllers/CartController";
import { CartService } from "../../application/cartService";
import { IRequest } from "../../interfaces/IRequest";

describe('CartController', () => {
    let cartController: CartController;
    let mockCartService: CartService;

    beforeAll(() => {
        mockCartService = {
            addToCartProduct: jest.fn(),
            viewCart: jest.fn(),
            removeProductFromCart: jest.fn(),
            updateCart: jest.fn()
        } as unknown as CartService;
        cartController = new CartController(mockCartService);
    });

    describe('addToCartProduct', () => {
        const cartDetails = {
            "cartId": 6,
            "productId" : 3,
            "quantity" : 2
        }
        const mockRequest = {
            user: { id: '65f96fe4b5f2a27b70cf022' },
            body: {}
        } as unknown as IRequest;
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
        const userId = "'65f96fe4b5f2a27b70cf022";
        const mockRequest = {
            user: { id: '65f96fe4b5f2a27b70cf022' },
            body: {}
        } as unknown as IRequest;
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockCart = [
            {
                "productId": 1, 
                "quantity": 5, 
                "userId": userId,
                "product": {
                    "id": 1, 
                    "productName": "Moose Tshirt",
                    "description": "S, M, L sizes are available", 
                    "productImage": "moose.jpg", 
                    "price": "1000", 
                }, 
            }];

        const mockNextFunction = jest.fn() as NextFunction;

        it('should view the cart', async () => {
            (mockCartService.viewCart as jest.Mock).mockResolvedValue(mockCart);
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

        const mockRequest = {
            user: { id: '65f96fe4b5f2a27b70cf022' },
            body: {}
        } as unknown as IRequest;
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

    describe ("modify cart", ()=> {
        const mockCartId = 20;
        const mockProductId = 30;

        const mockRequest = {
            user: { id: '65f96fe4b5f2a27b70cf022' },
            body: {}
        } as unknown as IRequest;
        const mockResponse = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        } as unknown as Response;

        const mockUpdatedItem = {
            "cartId": mockCartId,
            "productId": mockProductId,
            "quantity": 4
        }

        const mockNextFunction =jest.fn() as NextFunction;

        it('should update the quantity for given cartId and productId', async () => {
            (mockCartService.updateCart as jest.Mock).mockResolvedValue(mockUpdatedItem);
            mockRequest.body = mockUpdatedItem;
            await cartController.onModifyCart(mockRequest, mockResponse, mockNextFunction);
            expect(mockCartService.updateCart).toHaveBeenCalled();
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Cart is updated", data: mockUpdatedItem});
        });

        it('should handle the error when there is a bad request', async () => {
            (mockCartService.updateCart as jest.Mock).mockResolvedValue(null);
            try {
                await cartController.onModifyCart(mockRequest, mockResponse, mockNextFunction);
            } catch(error) {
                expect(mockResponse.status).toHaveBeenCalledWith(400);
                expect(mockResponse.json).toHaveBeenCalledWith({message: "Product item or cart not found"})
            }
        });

        it('should handle the error while updating the product quantity', async () => {
            const mockError = new Error('Some error occurred.');
            (mockCartService.addToCartProduct as jest.Mock).mockRejectedValue(mockError);

            await cartController.onAddToCart(mockRequest, mockResponse, mockNextFunction);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({message: "Internal server error"});
            expect(mockNextFunction).toHaveBeenCalledWith(mockError);
        });
    });
}); 