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
      from: "ref3r.official@gmail.com", // Replace with verified domain
      subject: "Welcome to the waitlist!",
      text: `You're #${position[0].position} in line. We'll notify you when it's your turn.`,
      html: `
        <h1>You're on the list!</h1>
        <p>You're #${position[0].position} in line. We'll notify you when it's your turn.</p>
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
