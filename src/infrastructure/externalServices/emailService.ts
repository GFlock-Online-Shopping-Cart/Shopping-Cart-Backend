import { Service } from "typedi";
import { ICheckoutDetails } from "../../interfaces/ICheckoutDetails";
const mailchimp = require("@mailchimp/mailchimp_transactional");


@Service()
export class EmailService {
    private mailchimpClient;
    constructor(){
        this.mailchimpClient = mailchimp(process.env.MAILCHIMP_API_KEY);
        console.log("API Key", process.env.MAILCHIMP_API_KEY);
    }
    

    async sendEmail(toEmail: string, checkoutDetails: ICheckoutDetails ): Promise<void> {
        console.log(process.env.MAILCHIMP_FROM_EMAIL);
        
        const emailTemplate = {
            to: [
                {
                    email: toEmail,
                    name: "John",
                    status: "subscribed"
                }
            ],
            subject: 'Thank you for your order',
            from: process.env.MAILCHIMP_FROM_EMAIL,
            html: 
            `<p>Thank you for your order. Here are your checkout details:</p>
            <p>Checkout Price: ${checkoutDetails.checkoutPrice}</p>
            <p>Checkout Items: ${checkoutDetails.checkoutItems.map(item => `<p>Product ID: ${item.productId}, Quantity: ${item.quantity}, Price: ${item.price}</p>`).join('')}</p>`

        }


        try {
            const response = await this.mailchimpClient.messages.send({message: emailTemplate});
            console.log(response)
            return response.config.data;

        } catch (error: any) {
            console.log("error",error);
            
            throw new Error(error.message || "Error sending email");
        }
    }

}