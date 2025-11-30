// Recommend halal vendors flow.

'use server';

/**
 * @fileOverview Recommends a short list of Halal certification vendors based on user requirements.
 *
 * - recommendHalalVendors - A function that recommends Halal certification vendors.
 * - RecommendHalalVendorsInput - The input type for the recommendHalalVendors function.
 * - RecommendHalalVendorsOutput - The return type for the recommendHalalVendors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendHalalVendorsInputSchema = z.object({
  requirements: z
    .string()
    .describe(
      'The specific requirements for Halal certification, including details about the UKM, products, and target market.'
    ),
  preferences: z
    .string()
    .optional()
    .describe(
      'Optional preferences such as vendor location, pricing, or specific services offered.'
    ),
});
export type RecommendHalalVendorsInput = z.infer<
  typeof RecommendHalalVendorsInputSchema
>;

const VendorRecommendationSchema = z.object({
  vendorName: z.string().describe('The name of the Halal certification vendor.'),
  vendorDescription: z.string().describe('A description of the vendor.'),
  suitabilityScore: z
    .number()
    .describe(
      'A numerical score indicating how well the vendor matches the user requirements (0-100).' +  
      '100 means perfect fit, 0 means not a fit at all.'
    ),
  rationale: z
    .string()
    .describe(
      'Explanation on why the Vendor has the given SuitabilityScore'  
    )
});

const RecommendHalalVendorsOutputSchema = z.array(
  VendorRecommendationSchema
).describe(
  'An array of recommended Halal certification vendors, ordered by suitability.'
);

export type RecommendHalalVendorsOutput = z.infer<
  typeof RecommendHalalVendorsOutputSchema
>;

export async function recommendHalalVendors(
  input: RecommendHalalVendorsInput
): Promise<RecommendHalalVendorsOutput> {
  return recommendHalalVendorsFlow(input);
}

const recommendVendorsPrompt = ai.definePrompt({
  name: 'recommendVendorsPrompt',
  input: {schema: RecommendHalalVendorsInputSchema},
  output: {schema: RecommendHalalVendorsOutputSchema},
  prompt: `You are an expert in matching UKM businesses with Halal certification vendors.

  Given the following requirements and preferences from a UKM user, recommend a short list of Halal certification vendors.
  Consider location, pricing, services offered, and the specific needs of the UKM.
  Each Vendor should have a suitability score and rationale.

  Requirements: {{{requirements}}}
  Preferences: {{{preferences}}}

  Format your output as a JSON array of VendorRecommendation objects.
  `,
});

const recommendHalalVendorsFlow = ai.defineFlow(
  {
    name: 'recommendHalalVendorsFlow',
    inputSchema: RecommendHalalVendorsInputSchema,
    outputSchema: RecommendHalalVendorsOutputSchema,
  },
  async input => {
    const {output} = await recommendVendorsPrompt(input);
    return output!;
  }
);
