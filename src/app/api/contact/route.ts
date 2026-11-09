import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveContactEnquiry } from '@/lib/data/store-repository';

const ContactSchema = z.object({
  customer_name: z.string().trim().min(2, 'Name is required'),
  contact_number: z.string().trim().min(10, 'Valid phone number is required'),
  message: z.string().trim().min(5, 'Message must be at least 5 characters'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Consent is required to submit your enquiry' }),
  }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = ContactSchema.parse(body);

    const enquiry = await saveContactEnquiry(data);

    return NextResponse.json({
      success: true,
      message: 'Enquiry submitted successfully. Our team will contact you shortly.',
      enquiryId: enquiry.id,
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: error.errors[0]?.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'Failed to submit enquiry. Please try again.' },
      { status: 500 }
    );
  }
}
