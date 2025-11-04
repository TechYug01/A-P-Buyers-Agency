import { Testimonial } from "@/lib/models/Testimonial";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: 1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error("GET testimonials error:", error);
    return NextResponse.json(
      { error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { name, category, description, rating, included } = body;

    if (!name || !category || !description || !rating) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name,
      category,
      description,
      rating,
      included: included ?? true,
    });

    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    console.error("POST testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to add testimonial" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const updated = await Testimonial.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updated)
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (!_id)
      return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const deleted = await Testimonial.findByIdAndDelete(_id);

    if (!deleted)
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );

    return NextResponse.json(
      { message: "Testimonial deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE testimonial error:", error);
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    );
  }
}
