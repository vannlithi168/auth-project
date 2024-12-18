import { MailtrapClient } from "mailtrap";

// Your Mailtrap token
const TOKEN = "f9d81d6b3aa3c19911b1869f2453a551";

// Create the Mailtrap client instance
export const client = new MailtrapClient({
  token: TOKEN,
});

// Define sender information
export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// const recipients = [
//   {
//     email: "kimvannlithi217@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     html: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
