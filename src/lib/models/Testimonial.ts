import { Document, model, models, Schema } from "mongoose";

export interface TestimonialDocument extends Document {
  name: string;
  category: string;
  description: string;
  rating: number;
  included: boolean;
}

const TestimonialSchema: Schema = new Schema<TestimonialDocument>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    included: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Testimonial =
  models.Testimonial ||
  model<TestimonialDocument>("Testimonial", TestimonialSchema);
