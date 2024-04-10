import { Service } from "typedi";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

@Service()
export class EmailService {
    async sendEmail(toEmail: string, templateId: number, emailContent: any): Promise<void> {
        const apiInstance = new TransactionalEmailsApi();
        const sendSmtpEmail = new SendSmtpEmail();
        sendSmtpEmail.sender = {
            email: process.env.SIB_FROM_EMAIL,
        }
        sendSmtpEmail.templateId = templateId;
      
        sendSmtpEmail.params = {  emailContent };
        sendSmtpEmail.messageVersions = [{
            to: [{
                email: toEmail,
            }],
        }],
        apiInstance.sendTransacEmail(sendSmtpEmail, {
            headers: {
                "api-key": process.env.SIB_API_KEY as string
            }
        }).then(
            function(data: any) {
                return data;
            },
            function (error: any) {
                return error;
            }
        )
    }
}