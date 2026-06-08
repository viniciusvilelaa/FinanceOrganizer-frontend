import * as z from "zod"

const currentDate = new Date().getFullYear();

export const goalValidation = z.object({
    name: z.string({ required_error: 'Name is required' }).max(15, "Name must be at most 15 characters").min(3, "Name must have 3 character at least"),

    targetAmount: z.number({ required_error: 'Target amount is required' }).positive({ message: 'Target amount must be positive' }),

    month: z.number({ required_error: "Month is required" })
        .int("Month must be an integer")
        .min(1, "Month must be at leat 1")
        .max(12, "Month must be at most 12"),

    year: z.number({ required_error: "Year is required" })
        .int("Year must be an integer")
        .min(currentDate, "Year cannot be in the past")

});

export const updateGoalValidation = z.object({
    name: z.string().max(15, "Name must be at most 15 characters").optional(),
    targetAmount: z.number().positive({ message: "Target amount must be positive" }).optional()
}).refine(data => data.name !== undefined || data.targetAmount !== undefined,
    {
        message: "At leat one field(name or targetAmount) must be provided for update"
    });