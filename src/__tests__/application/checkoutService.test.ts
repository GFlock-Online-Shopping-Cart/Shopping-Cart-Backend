import { CheckoutService } from "../../application/checkoutService";
import { Checkout } from "../../domain/entities/checkout";
import { CartRepository } from "../../infrastructure/repositories/cartRepository";
import { CheckoutRepository } from "../../infrastructure/repositories/checkoutRepository";

describe("CheckoutService", () => {
  let checkoutService: CheckoutService;
  let mockCheckoutRepository: CheckoutRepository;
  let mockCartRepository: CartRepository;

  beforeAll(() => {
    mockCheckoutRepository = {
      createCheckout: jest.fn(),
    } as unknown as CheckoutRepository;

    mockCartRepository = {
      viewCart: jest.fn(),
      removeAllCartItems: jest.fn(),
    } as unknown as CartRepository;

    checkoutService = new CheckoutService(
      mockCheckoutRepository,
      mockCartRepository
    );
  });

  describe("createCheckout", () => {
    it("should create the checkout", async () => {
      const userId = "65f96fe4b5f2a27b70cf022";
      const mockCartItems = [{
        "productId": 1,
        "quantity": 5,
        "product": {
          "price": "1000",
        },
        "checkoutId": 1,
      }];

      const mockCheckout = {
        "checkoutItems": [
          {
            "productId": 1,
            "quantity": 5,
            "price": "1000",
            "checkoutId": 1,
          },
        ],
        "checkoutPrice": 5000,
        "userId": "65f96fe4b5f2a27b70cf022d",
        "id": 1,
        "checkoutDate": "2024-03-28T05:50:01.102Z",
      };

      (mockCartRepository.viewCart as jest.Mock).mockResolvedValue(mockCartItems);

      (mockCheckoutRepository.createCheckout as jest.Mock).mockResolvedValue(mockCheckout);
      await checkoutService.ceateCheckout(userId);

      (mockCartRepository.removeAllCartItems as jest.Mock).mockResolvedValue([]);

      expect(mockCartRepository.viewCart).toHaveBeenCalledWith(userId);
      expect(mockCheckoutRepository.createCheckout).toHaveBeenCalled();
      expect(mockCartRepository.removeAllCartItems).toHaveBeenCalledWith(userId);

    });
  });
});
