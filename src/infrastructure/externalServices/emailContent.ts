export class EmailContentGenerator {
    generateCheckoutEmailContent(checkoutDetails: any): string {
      const checkoutItemsString = checkoutDetails.checkoutItems
        .map(
          (item: any) =>
            `<ul>
            <li>Product Id: ${item.productId} </li>
            <li>Quantity: ${item.quantity} </li>
            <li> Price: Rs.${item.price}.00 </li>
            </ul>
            </br>`
        )
        .join(" ");
  
      return `
        <h2>Check your Order Details </h2>
        <h3>Order Items: ${checkoutItemsString}</h3>
        <h3>Total Price: Rs.${checkoutDetails.checkoutPrice}.00</h3>
      `;
    }
  }
  