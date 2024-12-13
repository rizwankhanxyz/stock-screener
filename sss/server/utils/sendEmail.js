//this is for Email

import { Resend } from "resend";

const resend = new Resend("re_Sh23aeV9_9cZ2nrYGPqhzgvBYoUnjcwoJ"); //change

async function sendEmail(emailData) {
  const { data, error } = await resend.emails.send({
    from: "rizwan@rizwankhan.xyz",
    to: emailData.to,
    subject: emailData.subject,
    html: emailData.body,
  });
  if (error) {
    return console.error({ error });
  }
}

export default sendEmail;