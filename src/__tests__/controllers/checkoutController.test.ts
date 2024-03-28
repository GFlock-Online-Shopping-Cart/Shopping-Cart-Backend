import { Response, NextFunction } from "express";
import { CheckoutController } from "../../presentation/controllers/CheckoutController";
import { CheckoutService } from "../../application/checkoutService";
import { IRequest } from "../../interfaces/IRequest";

describe("CheckoutController", () => {
  let checkoutController: CheckoutController;
  let mockCheckoutService: CheckoutService;

  beforeAll(() => {
    mockCheckoutService = {
      ceateCheckout: jest.fn(), // corrected here
    } as unknown as CheckoutService;
    checkoutController = new CheckoutController(mockCheckoutService);
  });

  describe("createCheckout", () => {
    const mockRequest = {
      user: { id: "65f96fe4b5f2a27b70cf022" },
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
        message: "Checkout created successfully",
        data: mockCheckoutItems,
      });
    });

    it("should handle unauthorized error while creating checkout", async () => {
      const mockRequest = {
        user: null,
        body: {},
      } as unknown as IRequest;

      await checkoutController.onCreateCheckout(
        mockRequest,
        mockResponse,
        mockNextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Unauthorized",
      });
    });
  });
});
