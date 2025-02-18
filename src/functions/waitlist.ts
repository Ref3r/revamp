"use server";

import { Resend } from "resend";
import sql from "@/lib/db";
import { randomBytes } from "crypto";

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

    // Send magic link instead of confirmation email
    await sendMagicLink(email);

    return {
      success: true,
      position: position[0].position,
    };
  } catch (error) {
    console.error("Waitlist error:", error);
    return {
      success: false,
      error: "Failed to join waitlist",
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
      position: position[0].position,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to get position",
    };
  }
}

async function generateToken(email: string): Promise<string> {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hour expiry

  // Expire any existing unused tokens for this email
  await sql`
    UPDATE auth_tokens 
    SET expires_at = NOW()
    WHERE email = ${email} 
    AND used_at IS NULL
    AND expires_at > NOW()
  `;

  // Insert new token
  await sql`
    INSERT INTO auth_tokens (email, token, expires_at)
    VALUES (${email}, ${token}, ${expiresAt})
  `;

  return token;
}

export async function verifyToken(token: string) {
  try {
    // First check if token exists and is valid
    const tokenCheck = await sql`
      SELECT email, used_at 
      FROM auth_tokens 
      WHERE token = ${token}
      AND expires_at > NOW()
    `;

    if (tokenCheck.length === 0) {
      return { success: false, error: "Invalid or expired token" };
    }

    if (tokenCheck[0].used_at) {
      return { success: false, error: "Token already used" };
    }

    // Mark token as used
    const result = await sql`
      UPDATE auth_tokens 
      SET used_at = NOW()
      WHERE token = ${token}
      RETURNING email
    `;

    const email = tokenCheck[0].email;

    await sql`
      UPDATE waitlist 
      SET verified = true, 
          verified_at = NOW() 
      WHERE email = ${email}
      `;

    await resend.emails.send({
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
      `,
    });

    return { success: true, email: result[0].email };
  } catch (error) {
    console.error("Token verification error:", error);
    return { success: false, error: "Verification failed" };
  }
}

export async function sendMagicLink(email: string) {
  try {
    // Check for recent magic links
    const recentLinks = await sql`
      SELECT created_at 
      FROM auth_tokens 
      WHERE email = ${email}
      AND created_at > NOW() - INTERVAL '5 minutes'
      AND used_at IS NULL
    `;

    if (recentLinks.length > 0) {
      return {
        success: false,
        error: "Please wait 5 minutes before applying again",
      };
    }

    const token = await generateToken(email);
    const magicLink = `${
      process.env.NEXT_PUBLIC_APP_URL || "https://ref3r.com"
    }/auth/verify?token=${token}`;

    await resend.emails.send({
      to: email,
      from: `Ref3r <waitlist@onboarding.ref3r.com>`,
      subject: "Verify your spot on Ref3r's waitlist",
      html: `
        <h1>Welcome to Ref3r!</h1>
        <p>Click the link below to confirm your spot on our waitlist (valid for 24 hours):</p>
        <a href="${magicLink}">Confirm my spot</a>
        <p>If you didn't sign up for Ref3r's waitlist, you can safely ignore this email.</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Magic link error:", error);
    return { success: false, error: "Failed to send magic link" };
  }
}
