
import { supabase } from "@/integrations/supabase/client";
import { Country } from '../types/quiz';
import { toast } from '@/components/ui/sonner';

/**
 * Updates an existing lead record with the best country result using student_id
 * @param studentId Student ID to update
 * @param bestCountry The best country result
 */
export const updateLeadWithId = async (studentId: string, bestCountry: Country) => {
  try {
    console.log("Updating lead with student_id:", studentId, "Best country:", bestCountry);
    
    const { error } = await supabase
      .from('student_leads')
      .update({ best_country: bestCountry })
      .eq('student_id', studentId);
      
    if (error) throw error;
    
    console.log("Successfully updated lead with student_id:", studentId);
  } catch (error) {
    console.error('Error updating lead:', error);
  }
};

/**
 * Updates the most recent lead with the best country result
 * @param bestCountry The best country result
 */
export const updateBestCountryInDatabase = async (bestCountry: Country) => {
  try {
    console.log("Updating best_country for existing lead:", bestCountry);
    
    // Query to find the most recent lead without a best_country value
    const { data: recentLeads, error: fetchError } = await supabase
      .from('student_leads')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1);
    
    if (fetchError) throw fetchError;
    
    if (recentLeads && recentLeads.length > 0) {
      const studentId = recentLeads[0].student_id;
      
      // Update the lead with the best country using student_id
      const { error: updateError } = await supabase
        .from('student_leads')
        .update({ best_country: bestCountry })
        .eq('student_id', studentId);
        
      if (updateError) throw updateError;
      
      console.log("Successfully updated best_country for lead:", studentId);
    }
  } catch (error) {
    console.error('Error updating best country in database:', error);
  }
};

/**
 * Stores lead data to the database
 * @param name User's name
 * @param email User's email
 * @param whatsapp User's WhatsApp number
 * @param bestCountry The best country result
 */
export const storeLeadInDatabase = async (
  name: string, 
  email: string, 
  whatsapp: string, 
  bestCountry: Country | null
) => {
  try {
    if (!bestCountry) {
      console.error("Cannot store lead: best_country is null");
      return;
    }
    
    // Store data to Supabase including the best country result
    const dataToStore = {
      name,
      email,
      whatsapp,
      best_country: bestCountry
    };
    
    console.log("Saving to Supabase:", dataToStore);
    
    const { error } = await supabase
      .from('student_leads')
      .insert([dataToStore]);
      
    if (error) throw error;
    
    console.log('Lead submitted successfully with best_country:', bestCountry);
    
    // Show success message with animation
    toast("Thank you for your submission!", {
      description: "We'll contact you soon with free study abroad guidance.",
      duration: 5000,
    });
  } catch (error) {
    console.error('Error storing lead:', error);
    toast("There was an error saving your data.", {
      description: "Please try again or contact support.",
    });
    throw error;
  }
};
