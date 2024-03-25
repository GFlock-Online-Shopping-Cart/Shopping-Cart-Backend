import { Response, NextFunction } from "express";
import { UserController } from "../../presentation/controllers/UserController";
import { UserService } from "../../application/userService";
import { IRequest } from "../../interfaces/IRequest";
import exp from "constants";

describe("UserController", () => {
  let userController: UserController;
  let mockUserService: UserService;

  beforeEach(() => {
    mockUserService = {
      createProfile: jest.fn(),
    } as unknown as UserService;

    userController = new UserController(mockUserService);
  });

  describe("createProfile", () => {
    const mockRequest = {
        user: { id: '65f96fe4b5f2a27b70cf022' },
        body: {}
    } as unknown as IRequest;
    const mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    } as unknown as Response;
    const mockNextFunction = jest.fn() as NextFunction;

    const mockError = new Error("Some error occurred");

    it("should create a profile successfully", async () => {
      const mockProfile = {
        "id": "65f96fe4b5f2a27b70cf022",
        "firstName": "Sarith",
        "lastName": "Jayawardane",
        "mobileNumber": "0714582738",
        "streetAddress": "No 21, Kimbulagala Junction, Karapitiya",
        "city": "Galle",
        "province": "Southern"
      };

      (mockUserService.createProfile as jest.Mock).mockResolvedValue(mockProfile);

      await userController.onCreateProfile(mockRequest, mockResponse, mockNextFunction);

      expect(mockUserService.createProfile).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({message: "Profile created successfully", data: mockProfile})
    });

    it("should handle unauthorized error while creating profile", async () => {
        const mockRequest = {
            user: null,
            body: {}
        } as unknown as IRequest;

        await userController.onCreateProfile(mockRequest, mockResponse, mockNextFunction);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({ message: "Unauthorized" });
    })
  });
});
