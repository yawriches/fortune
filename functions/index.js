const {onRequest} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const crypto = require("crypto");
const {createClient} = require("@supabase/supabase-js");

admin.initializeApp();

const SUPABASE_URL = "https://himqiywqotpmuntxzrvo.supabase.co";
const SUPABASE_KEY = "your_supabase_key";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const app = express();
app.use(express.json());

const PAYSTACK_SECRET_KEY = "sk_test_305e1df5ac100ab3bdcecc07df3a0a31" +
  "e311c115";

app.post("/paystack-webhook", async (req, res) => {
  const event = req.body;
  const sigHeader = req.headers["x-paystack-signature"];
  const payload = JSON.stringify(req.body);

  const computedSignature = crypto
      .createHmac("sha512", PAYSTACK_SECRET_KEY)
      .update(payload)
      .digest("hex");

  if (sigHeader !== computedSignature) {
    return res.status(400).send("Invalid signature");
  }

  if (event.event === "charge.success") {
    const transaction = event.data;
    const userId = transaction.customer.email;

    try {
      const userRef = admin.firestore().collection("users").doc(userId);
      await userRef.update({
        paid: true,
        last_payment: new Date().toISOString(),
      });

      const {error: supabaseError} = await supabase
          .from("users")
          .update({
            paid: true,
            last_payment: new Date().toISOString(),
          })
          .eq("email", userId);

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      console.log(
          "Payment successful, user marked as paid in both systems",
      );

      res
          .status(200)
          .send("Webhook handled successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      res
          .status(500)
          .send("Error processing payment");
    }
  } else {
    res.status(200).send("Event not handled");
  }
});

exports.paystackWebhook = onRequest(app);
