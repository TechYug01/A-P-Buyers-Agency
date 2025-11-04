import { Webinar } from "@/lib/models/Webinar";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const webinars = await Webinar.find().sort({ createdAt: -1 });
    return NextResponse.json(webinars, { status: 200 });
  } catch (error) {
    console.error("GET webinars error:", error);
    return NextResponse.json(
      { error: "Failed to fetch webinars" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, date, time, url, description, included } = body;

    if (!title || !date || !time || !url || !description) {
      return NextResponse.json(
        {
          error:
            "All fields (title, date, time, url, description) are required",
        },
        { status: 400 }
      );
    }

    const newWebinar = await Webinar.create({
      title,
      date,
      time,
      url,
      description,
      included: included ?? true,
    });

    return NextResponse.json(newWebinar, { status: 201 });
  } catch (error) {
    console.error("POST webinar error:", error);
    return NextResponse.json(
      { error: "Failed to add webinar" },
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
        { error: "Webinar ID is required" },
        { status: 400 }
      );
    }

    const updatedWebinar = await Webinar.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedWebinar) {
      return NextResponse.json({ error: "Webinar not found" }, { status: 404 });
    }

    return NextResponse.json(updatedWebinar, { status: 200 });
  } catch (error) {
    console.error("PUT webinar error:", error);
    return NextResponse.json(
      { error: "Failed to update webinar" },
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
        { error: "Webinar ID is required" },
        { status: 400 }
      );
    }

    const deletedWebinar = await Webinar.findByIdAndDelete(_id);

    if (!deletedWebinar) {
      return NextResponse.json({ error: "Webinar not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Webinar deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE webinar error:", error);
    return NextResponse.json(
      { error: "Failed to delete webinar" },
      { status: 500 }
    );
  }
}
