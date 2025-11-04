import mongoose, { Document, models, Schema } from "mongoose";

export interface NewsletterDocument extends Document {
  title: string;
  summary: string;
  content: string;
  included: boolean;
}

const NewsletterSchema = new Schema<NewsletterDocument>(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    included: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Newsletter =
  models.Newsletter ||
  mongoose.model<NewsletterDocument>("Newsletter", NewsletterSchema);
