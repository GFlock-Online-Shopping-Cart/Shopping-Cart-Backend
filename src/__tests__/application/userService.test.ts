import { UserService } from "../../application/userService";
import { UserRepository } from "../../infrastructure/repositories/userReporitory";

describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: UserRepository;

  beforeAll(() => {
    mockUserRepository = {
      createProfile: jest.fn(),
    } as unknown as UserRepository;

    userService = new UserService(mockUserRepository);
  });

  describe("createProfile", () => {
    it("should create the profile", async () => {
      const userId = "65f96fe4b5f2a27b70cf022";
      const userDetails = {
        "firstName": "Sarith",
        "lastName": "Jayawardane",
        "mobileNumber": "0714582738",
        "streetAddress": "No 21, Kimbulagala Junction, Karapitiya",
        "city": "Galle",
        "province": "Southern"
      } as any;
      (mockUserRepository.createProfile as jest.Mock).mockResolvedValue(
        {
            "id": userId,
            "firstName": "Sarith",
            "lastName": "Jayawardane",
            "mobileNumber": "0714582738",
            "streetAddress": "No 21, Kimbulagala Junction, Karapitiya",
            "city": "Galle",
            "province": "Southern"
        }
    );
      await userService.createProfile(userDetails, userId);

      expect(mockUserRepository.createProfile).toHaveBeenCalled();
    });
  });
});
