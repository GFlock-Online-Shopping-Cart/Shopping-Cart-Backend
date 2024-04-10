import { CheckoutService } from "../../application/checkoutService";
import { CartRepository } from "../../infrastructure/repositories/cartRepository";
import { CheckoutRepository } from "../../infrastructure/repositories/checkoutRepository";
import { EmailService } from "../../infrastructure/externalServices/BrevoEmailService/emailService";

describe("CheckoutService", () => {
  let checkoutService: CheckoutService;
  let mockCheckoutRepository: CheckoutRepository;
  let mockCartRepository: CartRepository;
  let mockEmailService: EmailService

  beforeAll(() => {
    mockCheckoutRepository = {
      createCheckout: jest.fn(),
      getCheckoutById: jest.fn(),
      viewOrderHistory: jest.fn(),
    } as unknown as CheckoutRepository;

    mockCartRepository = {
      viewCart: jest.fn(),
      removeAllCartItems: jest.fn(),
    } as unknown as CartRepository;

    mockEmailService = {
      sendEmail: jest.fn()
    } as unknown as EmailService;

    checkoutService = new CheckoutService(
      mockCheckoutRepository,
      mockCartRepository,
      mockEmailService
    );
  });

  describe("createCheckout", () => {
    it("should create the checkout", async () => {
      const userId = "65f96fe4b5f2a27b70cf022";
      const userEmail = "randimadias@gmail.com"
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
      await checkoutService.ceateCheckout(userId, userEmail);

      (mockEmailService.sendEmail as jest.Mock).mockResolvedValue(userEmail);
      (mockCartRepository.removeAllCartItems as jest.Mock).mockResolvedValue([]);

      expect(mockCartRepository.viewCart).toHaveBeenCalledWith(userId);
      expect(mockCheckoutRepository.createCheckout).toHaveBeenCalled();
      expect(mockCartRepository.removeAllCartItems).toHaveBeenCalledWith(userId);

    });
  });

  describe("getCheckoutById", () => {
    it('should return checkout for given checkoutId', async () => {
      const checkoutId = 1;
      (mockCheckoutRepository.getCheckoutById as jest.Mock).mockResolvedValue(
        {
          "id": checkoutId,
          "checkoutDate": "2024-03-29T10:16:11.441Z",
          "checkoutPrice": "5000",
          "userId": "65f96fe4b5f2a27b70cf022d",
          "checkoutItems": [
            {
              "productId": 1,
              "checkoutId": checkoutId,
              "price": "1000",
              "quantity": 5
            }
          ]
        } as any
        )
        const result = await checkoutService.getCheckoutById(checkoutId);

        expect(mockCheckoutRepository.getCheckoutById).toHaveBeenCalledWith(checkoutId);
        expect(result?.id).toBe(checkoutId);
    })
  });

  describe("viewOrderHistory", () => {
    it("should return all checkouts for given userId", async () => {
      const userId = "65f96fe4b5f2a27b70cf022d";
      (mockCheckoutRepository.viewOrderHistory as jest.Mock).mockResolvedValue([
        {
          "c_id": 1,
          "c_checkoutDate": "2024-03-29T10:16:11.441Z",
          "c_checkoutPrice": "5000",
          "ci_productId": 1,
          "ci_price": "1000",
          "ci_quantity": 5
        },
        {
          "c_id": 2,
          "c_checkoutDate": "2024-03-29T10:18:13.670Z",
          "c_checkoutPrice": "6000",
          "ci_productId": 1,
          "ci_price": "1000",
          "ci_quantity": 2
        }]
      );

      const result = await checkoutService.viewOrderHistory(userId);
      expect(mockCheckoutRepository.viewOrderHistory).toHaveBeenCalled();
      expect(result).toHaveLength(2);
    })
  })
});
