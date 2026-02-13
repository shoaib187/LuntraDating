import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Plan from "../../../../backend/models/plan.model";

// POST: Create a new plan (Admin only)
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    console.log('request body', body);

    // Basic validation
    if (body.name === undefined || body.price === undefined) {
      return NextResponse.json(
        { message: "Name and price are required fields." },
        { status: 400 }
      );
    }

    const newPlan = await Plan.create(body);

    return NextResponse.json({
      success: true,
      message: "Plan created successfully",
      plan: newPlan
    }, { status: 201 });

  } catch (error) {
    console.error("Plan Creation Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}