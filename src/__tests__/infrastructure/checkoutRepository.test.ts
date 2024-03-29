import { myDataSource } from "../../config/dataSource";
import { Checkout } from "../../domain/entities/checkout";
import { CheckoutRepository } from "../../infrastructure/repositories/checkoutRepository";

jest.mock("../../config/dataSource");

describe("CheckoutRepository", () => {
  let checkoutRepository: CheckoutRepository;

  beforeAll(() => {
    checkoutRepository = new CheckoutRepository();
  });

  describe("createCheckout", () => {
    it("should create the checkout", async () => {
      const userId = "65f96fe4b5f2a27b70cf022d";
      const mockCheckout: Checkout = {
        id: 1,
        checkoutDate: new Date("2024-03-29T07:36:59.866Z"),
        checkoutPrice: 5000,
        userId: userId,
        checkoutItems: [
            {
                productId: 1,
                quantity: 5,
                price: 1000,
                checkoutId: 1
            }
        ] as any
    } as any;

      const saveMock = jest.fn().mockResolvedValue(mockCheckout);
      myDataSource.manager.save = saveMock;

      const createdCheckout = await checkoutRepository.createCheckout(mockCheckout);

      expect(saveMock).toHaveBeenCalledWith(mockCheckout);
      expect(createdCheckout).toEqual(mockCheckout);
    });
  });
});
