"use server";

import { Resend } from "resend";
import sql from "@/lib/db";`    `

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not set");
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function joinWaitlist(email: string) {
  try {
    // Add to database
    await sql`
      INSERT INTO waitlist (email, joined_at)
      VALUES (${email}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;

    const position = await sql`
      SELECT COUNT(*) as position 
      FROM waitlist 
      WHERE joined_at <= (
        SELECT joined_at FROM waitlist WHERE email = ${email}
      )
    `;

    const emailResponse = await resend.emails.send({
      to: email,
      from: `Ref3r <waitlist@onboarding.ref3r.com>`,
      subject: "You're on Ref3r's Waitlist! 🎨",
      // text: `You're #${position[0].position} in line. We'll notify you when it's your turn.`,
      html: `
      <h1>Hi ${email.split("@")[0]},</h1>

      <p>Thanks for joining Ref3r's waitlist! We're building the ultimate platform for creators and businesses to connect, collaborate, and grow together.</p>
      <p>We'll notify you as soon as we're ready to welcome you in.</p>

      <p>Stay creative!</p>
      <p>The Ref3r Team</p>

      <p>P.S. Have questions? Just reply to this email.</p>
      `


    });

    console.log(emailResponse);

    return {
      success: true,
      position: position[0].position
    };

  } catch (error) {
    console.error("Waitlist error:", error);
    return {
      success: false,
      error: "Failed to join waitlist"
    };
  }
}

export async function getWaitlistPosition(email: string) {
  try {
    const position = await sql`
      SELECT COUNT(*) as position 
      FROM waitlist 
      WHERE joined_at <= (
        SELECT joined_at FROM waitlist WHERE email = ${email}
      )
    `;
    
    return {
      success: true,
      position: position[0].position
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to get position"
    };
  }
}
