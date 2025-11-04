import mongoose, { Document, models, Schema } from "mongoose";

export interface EventDocument extends Document {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  included: boolean;
}

const EventSchema = new Schema<EventDocument>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
    included: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Event =
  models.Event || mongoose.model<EventDocument>("Event", EventSchema);
