import { Event } from "@/lib/models/Event";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("GET events error:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, date, description, image, link, included } = body;

    if (!title || !date || !description || !image || !link) {
      return NextResponse.json(
        {
          error:
            "All fields (title, date, description, image, link) are required",
        },
        { status: 400 }
      );
    }

    const newEvent = await Event.create({
      title,
      date,
      description,
      image,
      link,
      included: included ?? true,
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("POST event error:", error);
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectDB();
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json(
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    console.error("PUT event error:", error);
    return NextResponse.json(
      { error: "Failed to update event" },
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
        { error: "Event ID is required" },
        { status: 400 }
      );
    }

    const deletedEvent = await Event.findByIdAndDelete(_id);

    if (!deletedEvent) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE event error:", error);
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    );
  }
}
