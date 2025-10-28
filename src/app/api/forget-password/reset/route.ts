import { sendEmail } from "@/lib/email";
import { prisma } from "@/lib/prismaDB";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json("User not found", { status: 404 });
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const passwordResetTokenExp = new Date();
  passwordResetTokenExp.setHours(passwordResetTokenExp.getHours() + 1);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      // store the hashed token in the database; the raw token is sent to the user
      passwordResetToken: hashedToken,
      passwordResetTokenExp,
    },
  });

  const resetURL = `${process.env.SITE_URL}/auth/reset-password/${resetToken}`;

  try {
    await sendEmail({
      to: email,
      subject: "Jelszó visszaállítása",
      html: ` 
      <div>
        <h1>Jelszó visszaállítása</h1>
        <p>Kattints az alábbi linkre a jelszavad visszaállításához</p>
        <a href="${resetURL}" target="_blank">Jelszó visszaállítása</a>
      </div>
      `,
    });

    return NextResponse.json("A levelet elküldtük az email címedre", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("Hiba történt. Kérlek, próbáld újra!", {
      status: 500,
    });
  }
}
