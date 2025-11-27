-- Create student_leads table
CREATE TABLE public.student_leads (
  student_id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  best_country TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.student_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert leads (for quiz submissions)
CREATE POLICY "Anyone can submit leads"
ON public.student_leads
FOR INSERT
WITH CHECK (true);

-- Create policy to allow reading own leads (optional, for future use)
CREATE POLICY "Users can view all leads"
ON public.student_leads
FOR SELECT
USING (true);

-- Create policy to allow updating leads by student_id
CREATE POLICY "Anyone can update leads"
ON public.student_leads
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_student_leads_created_at ON public.student_leads(created_at DESC);
CREATE INDEX idx_student_leads_email ON public.student_leads(email);