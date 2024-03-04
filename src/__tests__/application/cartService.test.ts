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
        } as unknown as CartRepository;

        cartService = new CartService(mockCartRepository);
    });

    describe('addTocartProduct', () => {
        it('should add the product to the cart', async () => {
            const cartDetails = {
                "cartId": 6,
                "productId": 3,
                "quantity": 2
            } as any;
            (mockCartRepository.addToCartProduct as jest.Mock).mockResolvedValue(cartDetails);
            await cartService.addToCartProduct(cartDetails);

            expect(mockCartRepository.addToCartProduct).toHaveBeenCalled();
        });
    });

    it('should view the cart', async () => {
        const cartId = 6;
        (mockCartRepository.viewCart as jest.Mock).mockResolvedValue(
            {
                "cart_item_cartId": cartId,
                "cart_item_productId": 1,
                "cart_item_quantity": 2,
                "product_productName": "Moose Tshirt",
                "product_productImage": "moose.jpg",
                "product_price": "990"
            }
        )
        await cartService.viewCart(cartId);
        expect(mockCartRepository.viewCart).toHaveBeenCalledWith(cartId);
    });

    it('should remove a product', async () => {
        const cartId = 6;
        const productId = 1;

        (mockCartRepository.removeProductFromCart as jest.Mock).mockResolvedValue("Successfully Removed");

        await cartService.removeProductFromCart(cartId, productId);
        expect(mockCartRepository.removeProductFromCart).toHaveBeenCalledWith(cartId, productId)
    })
});