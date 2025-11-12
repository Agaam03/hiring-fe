import { z } from 'zod';
import { id } from 'zod/v4/locales';

export const LoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().optional()
})
export const RegisterSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().optional()
})

export const ResetSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(8,{message: 'Minimum 8 characters required' }),
    oobCode: z.string()
})

export const UserSchema = z.object({
  uid: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  photo: z.string().url().optional(),
  verified: z.boolean(),
  createdAt: z.date(),

  candidate: z.object({
    id: z.string().regex(/^cand_\d{8}_\d{4}$/, "Invalid candidate ID format"),
    attributes: z.array(
      z.object({
        key: z.string(),
        label: z.string(),
        value: z.union([z.string(), z.number(), z.boolean()]),
        order: z.number().int().nonnegative(),
      })
    ),
  }),
});

export const JobSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  title: z.string().min(1, "Job title is required"),
  jobType: z.string().min(1, "Job Type is required"),
  jobDescription: z.string().min(1, "Job Description is required"),
  status: z
  .string()
  .transform((val) => val.charAt(0).toUpperCase() + val.slice(1).toLowerCase())
  .refine((val) => ["Active", "Inactive"].includes(val), {
    message: 'Status must be "Active" or "Inactive"',
  }),
  salary_range: z.object({
    min: z
      .number({ message: "Minimum salary must be a number" })
      .min(1000000, "Minimum salary must be greater than 1000000"),
    max: z
      .number({ message: "Maximum salary must be a number" })
      .min(1500000, "Maximum salary must be greater than 1500000"),
    currency: z.enum(["IDR", "USD"]).default("IDR"),
    display_text: z.string().optional(),
  }),
  list_card: z.object({
    badge: z.string().default("Inactive"),
    started_on_text: z.string().optional(), 
    cta: z.string().default("Manage Job"),
  }),
  application_form: z.object({
    sections: z.array(
      z.object({
        title: z.string(),
        fields: z.array(
          z.object({
            key: z.enum([
              "full_name",
              "photo_profile",
              "gender",
              "domicile",
              "email",
              "phone_number",
              "linkedin_link",
              "date_of_birth",
            ]),
            validation: z.object({
              status: z.enum(["mandatory", "optional", "off"]),
            }),
          })
        ),
      })
    ),
  }),
});
