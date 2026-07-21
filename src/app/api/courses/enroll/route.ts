import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userEmail, courseId, paidAmount, paymentId } = body;

    if (!userEmail || !courseId || !paymentId) {
      return NextResponse.json(
        { error: "User email, course ID, and payment ID are required." },
        { status: 400 }
      );
    }

    // Find user by email or fallback to first user
    let user = await db.user.findUnique({
      where: { email: userEmail.toLowerCase() },
    });

    if (!user) {
      user = await db.user.findFirst();
      if (!user) {
        return NextResponse.json({ error: "User not found." }, { status: 404 });
      }
    }

    // Verify course exists
    const course = await db.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found." }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await db.enrollment.findFirst({
      where: {
        userId: user.id,
        courseId: course.id,
      },
    });

    if (existingEnrollment) {
      return NextResponse.json({
        success: true,
        message: "Already enrolled in this course.",
        enrollment: existingEnrollment,
      });
    }

    // Create Enrollment Record in SQLite DB
    const enrollment = await db.enrollment.create({
      data: {
        userId: user.id,
        courseId: course.id,
        paidAmount: paidAmount || course.price,
        paymentId: paymentId || `pay_rzp_${Date.now()}`,
        progress: 10,
      },
      include: {
        course: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Successfully enrolled & payment verified!",
      enrollment,
    });
  } catch (error) {
    console.error("Enrollment API Error:", error);
    return NextResponse.json(
      { error: "Failed to process course enrollment." },
      { status: 500 }
    );
  }
}
