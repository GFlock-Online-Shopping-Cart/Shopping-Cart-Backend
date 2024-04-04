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

  describe("getCheckoutById", () => {
    it("should return checkout by checkoutId", async () => {
      const checkoutId = 1;
      const mockCheckout = jest.fn().mockResolvedValue( {
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
      });

      (myDataSource.createQueryBuilder as jest.Mock).mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnValueOnce({
          where: jest.fn().mockReturnValueOnce({
            getOne: jest.fn().mockResolvedValueOnce(mockCheckout)
          })
        })
      })
      const result = await checkoutRepository.getCheckoutById(checkoutId);

      expect(result).toEqual(mockCheckout);
      expect(myDataSource.createQueryBuilder).toHaveBeenCalledTimes(1)
    });
  });

  describe("viewOrderHistory", () => {
    it("should return all checkout for given userId", async () => {
      const userId = "65f96fe4b5f2a27b70cf022d";
      const mockCheckouts = jest.fn().mockResolvedValue([
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
        }]);

        (myDataSource.createQueryBuilder as jest.Mock).mockReturnValueOnce({
          select: jest.fn().mockReturnValueOnce({
            from: jest.fn().mockReturnValueOnce({
              innerJoin: jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce({
                  getRawMany: jest.fn().mockResolvedValueOnce(mockCheckouts)
                })
              })
            })
          })
        });

        const result = await checkoutRepository.viewOrderHistory(userId);
        expect(result).toEqual(mockCheckouts);
    });
  });
});
