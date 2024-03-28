import { CartService } from "../../application/cartService";
import { CartRepository } from "../../infrastructure/repositories/cartRepository";

describe('CartService', () => {
    let cartService: CartService;
    let mockCartRepository: CartRepository;

    beforeAll(() => {
        mockCartRepository = {
            addToCartProduct: jest.fn(),
            viewCart: jest.fn(),
            removeProductFromCart: jest.fn(),
            modifyCart: jest.fn()
            
        } as unknown as CartRepository;

        cartService = new CartService(mockCartRepository);
    });

    describe('addTocartProduct', () => {
        it('should add the product to the cart', async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const cartDetails = {
                "userId": userId,
                "productId": 3,
                "quantity": 2
            } as any;
            (mockCartRepository.addToCartProduct as jest.Mock).mockResolvedValue(cartDetails);
            await cartService.addToCartProduct(cartDetails, userId);

            expect(mockCartRepository.addToCartProduct).toHaveBeenCalled();
        });
    });

    it('should view the cart', async () => {
        const userId = "65f96fe4b5f2a27b70cf022";
        (mockCartRepository.viewCart as jest.Mock).mockResolvedValue(
            {
                "cart_item_userId": userId,
                "cart_item_productId": 1,
                "cart_item_quantity": 2,
                "product_productName": "Moose Tshirt",
                "product_productImage": "moose.jpg",
                "product_price": "990"
            }
        )
        await cartService.viewCart(userId);
        expect(mockCartRepository.viewCart).toHaveBeenCalledWith(userId);
    });

    it('should remove a product', async () => {
        const userId = "65f96fe4b5f2a27b70cf022";
        const productId = 1;

        (mockCartRepository.removeProductFromCart as jest.Mock).mockResolvedValue("Successfully Removed");

        await cartService.removeProductFromCart(userId, productId);
        expect(mockCartRepository.removeProductFromCart).toHaveBeenCalledWith(userId, productId)
    });

    describe('modify cart', () => {
        it('should update the cart item quantity', async() => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const cartDetails = {
                "userId": userId,
                "productId": 3,
                "quantity": 2
            } as any;
            (mockCartRepository.modifyCart as jest.Mock).mockResolvedValue(cartDetails);
            await cartService.updateCart(cartDetails, userId);

            expect(mockCartRepository.addToCartProduct).toHaveBeenCalled();
        })
        
    })
});