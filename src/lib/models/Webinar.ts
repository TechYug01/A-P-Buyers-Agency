import mongoose, { Document, models, Schema } from "mongoose";

export interface WebinarDocument extends Document {
  title: string;
  date: string;
  time: string;
  url: string;
  description: string;
  included: boolean;
}

const WebinarSchema = new Schema<WebinarDocument>(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String, required: true },
    included: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Webinar =
  models.Webinar || mongoose.model<WebinarDocument>("Webinar", WebinarSchema);
