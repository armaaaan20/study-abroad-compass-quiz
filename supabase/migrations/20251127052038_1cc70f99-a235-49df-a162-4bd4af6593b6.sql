-- Make best_country nullable so leads can be captured before quiz completion
ALTER TABLE public.student_leads 
ALTER COLUMN best_country DROP NOT NULL;