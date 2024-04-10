import { Response, NextFunction } from "express";
import { CheckoutController } from "../../presentation/controllers/CheckoutController";
import { CheckoutService } from "../../application/checkoutService";
import { IRequest } from "../../interfaces/IRequest";

describe("CheckoutController", () => {
  let checkoutController: CheckoutController;
  let mockCheckoutService: CheckoutService;

  beforeAll(() => {
    mockCheckoutService = {
      ceateCheckout: jest.fn(),
      getCheckoutById: jest.fn(),
      viewOrderHistory: jest.fn(),
    } as unknown as CheckoutService;
    checkoutController = new CheckoutController(mockCheckoutService);
  });

  describe("createCheckout", () => {
    const mockRequest = {
      user: { 
        id: "65f96fe4b5f2a27b70cf022",
        email: "randimadias@gmail.com"
      },
    } as unknown as IRequest;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const mockCheckoutItems = {
      productId: 1,
      quantity: 5,
      price: "1000",
      checkoutId: 1,
    };
    const mockNextFunction = jest.fn() as NextFunction;

    it("should create the checkout", async () => {
      (mockCheckoutService.ceateCheckout as jest.Mock).mockResolvedValue({
        productId: 1,
        quantity: 5,
        price: "1000",
        checkoutId: 1,
      });

      await checkoutController.onCreateCheckout(
        mockRequest,
        mockResponse,
        mockNextFunction
      );
      expect(mockCheckoutService.ceateCheckout).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockCheckoutItems,
      });
    });
  });

  describe("getCheckoutById", () => {
    const checkoutId = 1;
    const mockRequest = {
      user: { id: "65f96fe4b5f2a27b70cf022" },
    } as unknown as IRequest;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const mockNextFunction = jest.fn() as NextFunction;

    const mockCheckout = {
      id: checkoutId,
      checkoutDate: "2024-03-29T10:16:11.441Z",
      checkoutPrice: "5000",
      userId: "65f96fe4b5f2a27b70cf022d",
      checkoutItems: [
        {
          productId: 1,
          checkoutId: checkoutId,
          price: "1000",
          quantity: 5,
        },
      ],
    };

    it("should get checkout for given checkoutId", async () => {
      (mockCheckoutService.getCheckoutById as jest.Mock).mockResolvedValue(
        mockCheckout
      );

      mockRequest.params = { checkoutId } as any;
      await checkoutController.onGetCheckoutById(mockRequest, mockResponse, mockNextFunction
      );

      expect(mockCheckoutService.getCheckoutById).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockCheckout,
      });
    });

    it("should handle the not found error while getting product by id", async () => {
      (mockCheckoutService.getCheckoutById as jest.Mock).mockResolvedValueOnce(
        null
      );
      try {
        await checkoutController.onGetCheckoutById(
          mockRequest,
          mockResponse,
          mockNextFunction
        );
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "The checkout is not found",
        });
      }
    });

    it("should handle the error while getting checkout by id", async () => {
      (mockCheckoutService.getCheckoutById as jest.Mock).mockImplementation(
        async () => Promise.reject(new Error("Internal server error"))
      );
      try {
        await checkoutController.onGetCheckoutById(
          mockRequest,
          mockResponse,
          mockNextFunction
        );
      } catch (error) {
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
          message: "Internal server error",
        });
      }
    });
  });

  describe("viewOrderHistory", () => {
    const mockRequest = {
      user: { id: "65f96fe4b5f2a27b70cf022" },
    } as unknown as IRequest;

    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    const mockNextFunction = jest.fn() as NextFunction;
    const mockError = new Error('Some error occurred.');

    it("should get all checkouts by userId", async () => {
      const mockAllCheckouts = [
        {
          c_id: 1,
          c_checkoutDate: "2024-03-29T10:16:11.441Z",
          c_checkoutPrice: "5000",
          ci_productId: 1,
          ci_price: "1000",
          ci_quantity: 5,
        },
        {
          c_id: 2,
          c_checkoutDate: "2024-03-29T10:18:13.670Z",
          c_checkoutPrice: "6000",
          ci_productId: 1,
          ci_price: "1000",
          ci_quantity: 2,
        },
      ];

      (
        mockCheckoutService.viewOrderHistory as jest.Mock
      ).mockResolvedValue(mockAllCheckouts);
      await checkoutController.onViewOrderHistory(
        mockRequest,
        mockResponse,
        mockNextFunction
      );

      expect(mockCheckoutService.viewOrderHistory).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Success",
        data: mockAllCheckouts,
      });
    });

    it('should handle error while getting all checkouts', async () => {
      (mockCheckoutService.viewOrderHistory as jest.Mock).mockRejectedValue(mockError);
      await checkoutController.onViewOrderHistory(mockRequest, mockResponse, mockNextFunction);
      expect(mockNextFunction).toHaveBeenCalledWith(mockError);
    });
  });
});
