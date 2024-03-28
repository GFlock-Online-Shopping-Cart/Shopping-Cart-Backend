import { myDataSource } from "../../config/dataSource";
import { CartItem } from "../../domain/entities/cartItem";
import { CartRepository } from "../../infrastructure/repositories/cartRepository";

jest.mock("../../config/dataSource");

describe("CartRepository", () => {
    let cartRepository: CartRepository;
    
    
    beforeAll(() => {
        cartRepository = new CartRepository();
    });

    describe("addToCartProduct", () => {
        it("should return the cart", async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const mockItem = jest.fn().mockResolvedValue({
                "userId": userId,
                "productId" : 3,
                "quantity" : 2
            });
            myDataSource.getRepository = jest.fn().mockReturnValue({
                save: mockItem,
            });
            await cartRepository.addToCartProduct(mockItem, userId);

            expect(myDataSource.getRepository).toHaveBeenCalledWith(CartItem);
            expect(mockItem).toHaveBeenCalled();
        });
    });

    describe("viewCart", () => {
        it("should return the cart for given cartId", async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const mockSelect = jest.fn().mockResolvedValue([
                {
                    "cart_item_userId": userId,
                    "cart_item_productId": 1,
                    "cart_item_quantity": 2,
                    "product_productName": "Moose Tshirt",
                    "product_productImage": "moose.jpg",
                    "product_price": "990"
                }, 
                {
                    "cart_item_userId": userId,
                    "cart_item_productId": 2,
                    "cart_item_quantity": 2,
                    "product_productName": "Uptown Tshirt",
                    "product_productImage": "uptown.jpg",
                    "product_price": "1290"
                } 
            ]
            );

            (myDataSource.createQueryBuilder as jest.Mock).mockReturnValueOnce({
                innerJoinAndSelect: jest.fn().mockReturnValueOnce({
                    where: jest.fn().mockReturnValueOnce({
                        select: jest.fn().mockReturnValueOnce({
                            getRawMany: jest.fn().mockResolvedValueOnce(mockSelect)
                        })
                    })
                }) 
            })
            const result = await cartRepository.viewCart(userId);

            expect(result).toEqual(mockSelect);
            expect(myDataSource.createQueryBuilder).toHaveBeenCalledTimes(1);
        });
    });

    describe("removeProductFromCart", () => {
        it("should remove a product from given cartId and productId", async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const productId = 20;

            const mockFindOne = jest.fn().mockReturnValueOnce({
                where: jest.fn().mockReturnValueOnce(CartItem)
            })

            const mockDelete = jest.fn().mockResolvedValue(CartItem);

            myDataSource.getRepository = jest.fn().mockReturnValue(
                { 
                    findOne: mockFindOne,
                    delete:  mockDelete
                },     
            );

            const result = await cartRepository.removeProductFromCart(userId, productId);

            expect(myDataSource.getRepository).toHaveBeenCalledWith(CartItem);
            expect(result).toBe("Cart item removed successfully.")
        });
    });

    describe("modifyCart", () => {
        it("should modify the cart item entity for given cartId and productId", async () => {
            const userId = "65f96fe4b5f2a27b70cf022";
            const productId = 10;
            const quantity = 20;

            const cartDetails = {
                productId: 10,
                quantity: 30
            }

            const mockFindOneBy = jest.fn().mockResolvedValue({
                productId: productId,
                quantity: quantity
            });

            const mockMerge = jest.fn().mockResolvedValue({
                productId: productId,
                quantity: 30
            });

            const mockSave = jest.fn().mockResolvedValue({
                productId: productId,
                quantity: 30
            });

            myDataSource.getRepository = jest.fn().mockReturnValue({
                findOneBy: mockFindOneBy,
                merge: mockMerge,
                save: mockSave
            });

            const result = await cartRepository.modifyCart(cartDetails, userId);

            expect(result).toEqual(cartDetails);
        });
    });
})