import { Newsletter } from "@/lib/models/Newsletter";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const newsletters = await Newsletter.find().sort({ createdAt: -1 });
    return NextResponse.json(newsletters, { status: 200 });
  } catch (error) {
    console.error("GET newsletters error:", error);
    return NextResponse.json(
      { error: "Failed to fetch newsletters" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, summary, content, included } = body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { error: "All fields (title, summary, content) are required" },
        { status: 400 }
      );
    }

    const newNewsletter = await Newsletter.create({
      title,
      summary,
      content,
      included: included ?? true,
    });

    return NextResponse.json(newNewsletter, { status: 201 });
  } catch (error) {
    console.error("POST newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to add newsletter" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Newsletter ID is required" },
        { status: 400 }
      );
    }

    const updatedNewsletter = await Newsletter.findByIdAndUpdate(
      _id,
      updateData,
      {
        new: true,
      }
    );

    if (!updatedNewsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedNewsletter, { status: 200 });
  } catch (error) {
    console.error("PUT newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to update newsletter" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("id");

    if (!_id) {
      return NextResponse.json(
        { error: "Newsletter ID is required" },
        { status: 400 }
      );
    }

    const deletedNewsletter = await Newsletter.findByIdAndDelete(_id);

    if (!deletedNewsletter) {
      return NextResponse.json(
        { error: "Newsletter not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Newsletter deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE newsletter error:", error);
    return NextResponse.json(
      { error: "Failed to delete newsletter" },
      { status: 500 }
    );
  }
}
