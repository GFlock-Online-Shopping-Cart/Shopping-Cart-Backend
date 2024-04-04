import { Service } from "typedi";
import { ICheckoutDetails } from "../../interfaces/ICheckoutDetails";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import { isNotEmpty } from "class-validator";


@Service()
export class EmailService {

  async sendEmail(
    toEmail: string,
    checkoutDetails: ICheckoutDetails
  ): Promise<void> {
    const apiInstance = new TransactionalEmailsApi();
    const sendSmtpEmail = new SendSmtpEmail(
    );
    sendSmtpEmail.sender = {
        email: process.env.SIB_FROM_EMAIL,
    }
    sendSmtpEmail.templateId = 4
    sendSmtpEmail.params = {
        checkoutPrice: checkoutDetails.checkoutPrice,
        checkoutItems: `
        <h2>Check your Order Details </h2>

        <h3>Order Items: ${checkoutDetails.checkoutItems
           .map(
             (item) =>
               `<ul>
               <li>Product Id: ${item.productId} </li>
               <li>Quantity: ${item.quantity} </li>
               <li> Price: Rs.${item.price}.00 </li>
               </ul>
               </br>`
           )
           .join(" ")}</h3>` 
    }
    sendSmtpEmail.messageVersions = [
            {
              to: [
                {
                  email: toEmail,
                },
              ],
            },
          ],

    apiInstance.sendTransacEmail(sendSmtpEmail, {
        headers: {
            "api-key": process.env.SIB_API_KEY as string
        }
    }).then(
      function (data: any) {
        console.log("API called successfully");
      },
      function (error: any) {
        console.error(error);
      }
    );
  }

}

