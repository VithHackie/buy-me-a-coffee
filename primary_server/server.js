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
      from: 'KrishVerma <onboarding@resend.dev>',
      to: body.email,
      subject: `Thank you for the coffee! ☕`,
      html: `<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'> \
            <p><strong>Hello Krish,</strong></p> \
            <p>A Friend has sended ${body.eth}ether with email ${body.email} contact her/him to collaborate from front.</p> \
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
