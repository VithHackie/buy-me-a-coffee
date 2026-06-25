import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { Resend } from "resend";


const app = express();
app.use(express.json());

app.use(cors({
  origin : process.env.VERCEL_URL
}));

const resend = new Resend(process.env.RESEND_API_KEY)

app.post("/validate", async (req, res) => {
  const body = req.body;
  try {
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: body.email,
      subject: `Thank you for the coffee! ☕`,
      html: `<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'> \
            <p><strong>Hello Friend,</strong></p> \
            <p>I just wanted to reach out and send a sincere thank you for your generous donation of ${body.eth}eth. Your support means a lot to me and truly helps keep my work going!</p> \
            <p>Since you are already familiar with my work, I wanted to see if you might be interested in collaborating on a project together. I am always looking to team up with great people, and I’d love to hear if you have any upcoming projects, ideas, or problems you need solved where my skills as a developer could be of value to you.</p> \
            <p>Let me know if you'd be open to a quick chat sometime this week!</p> \
            <p><strong>Best regards,</strong><br> \
            <strong>Krish Verma</strong><br> \
            <a href='https://www.linkedin.com/in/krish-verma-384234271/'>My Portfolio / LinkedIn</a></p> \
            </div>`,
    });
    res.json({ message: "message sent" });
  } catch (e) {
    res.json({ message: e.message });
    console.log(e);
  }
});

app.listen(process.env.PORT || 8080, (err) => {
  if (err) console.log(err);
  else console.log("SERVER IS RUNNING! on port " + process.env.PORT || 8080);
});