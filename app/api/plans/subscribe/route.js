import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import User from "../../../../backend/models/users.model";
import Plan from "../../../../backend/models/plan.model";
import { getUserFromRequest } from "../../../../backend/lib/auth/auth";

export async function POST(req) {
  try {
    await connectDB();

    // 1. Identify the user
    const currentUser = await getUserFromRequest(req);
    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // console.log('currentUser', currentUser);
    // return

    const { planId } = await req.json();
    if (!planId) {
      return NextResponse.json({ message: "Plan ID is required" }, { status: 400 });
    }

    // 2. Verify the plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json({ message: "Plan not found" }, { status: 404 });
    }

    // 3. Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.durationInDays);

    // 4. Update the User
    const updatedUser = await User.findByIdAndUpdate(
      currentUser.id,
      {
        $set: {
          role: plan.name.toLowerCase() === "free" ? "free" : "premium",
          subscription: {
            planId: plan._id,
            startDate,
            endDate,
            isActive: true,
          },
        },
      },
      { new: true }
    ).populate("subscription.planId");

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to ${plan.name}`,
      subscription: updatedUser.subscription,
      role: updatedUser.role
    });

  } catch (error) {
    console.error("Subscription Error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}