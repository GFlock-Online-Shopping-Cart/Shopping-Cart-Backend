import { myDataSource } from "../../config/dataSource";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/repositories/userReporitory";

jest.mock("../../config/dataSource");

describe("UserRepository", () => {
    let userReporitory: UserRepository;

    beforeAll(() => {
        userReporitory = new UserRepository();
    });

    describe("createProfile", () => {
        it("should create profile for registered user", async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const mockProfile = jest.fn().mockResolvedValue(
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
            myDataSource.getRepository = jest.fn().mockReturnValue({
                save: mockProfile,
            });
            await userReporitory.createProfile(mockProfile, userId);

            expect(myDataSource.getRepository).toHaveBeenLastCalledWith(User);
            expect(mockProfile).toHaveBeenCalled();
        });
    })
})