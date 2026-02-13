import { NextResponse } from "next/server";
import connectDB from "../../../../backend/lib/db/db";
import Plan from "../../../../backend/models/plan.model";

export async function GET() {
  try {
    await connectDB();
    const plans = await Plan.find({}).sort({ price: 1 });
    return NextResponse.json({ success: true, plans });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching plans" }, { status: 500 });
  }
}