import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.5";

serve(async (req) => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"); // FIXED 🔥

    const supabase = createClient(supabaseUrl!, supabaseServiceRoleKey!);

    const payload = await req.json();

    if (payload.event === "charge.success") {
      const email = payload.data.customer.email;
      const reference = payload.data.reference;

      const { error } = await supabase
        .from("users")
        .update({
          paid: true,
          payment_reference: reference,
        })
        .eq("email", email);

      if (error) {
        console.error("Supabase DB update failed:", error);
        return new Response("Failed to update user", { status: 500 });
      }

      return new Response("User payment updated", { status: 200 });
    }

    return new Response("Event ignored", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Internal server error", { status: 500 });
  }
});
