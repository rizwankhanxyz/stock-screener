import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import dataModel from "../models/dataModel.js";

dotenv.config();

const router = express.Router();
const TOGETHER_AI_API_KEY = process.env.TOGETHER_AI_API_KEY;

// AI Chat Route

/*
 * API: /api/ai/ask-ai
 * METHOD: POST
 * DESC: Data Adding in Backend
 * Body: Excel File Data
 * Access: Private
 * Validations: so far none
 */
router.post("/ask-ai", async (req, res) => {
    try {
        const { userQuery } = req.body;

        // Check if the user asked about a specific stock
        // const match = userQuery.match(/(.*?)$/i);
        const match = userQuery.match(/(.*?)$/i);
        let stockInfo = null;
        let aiResponse = "";

        if (match && match[1]) {
            const stockSymbol = match[1].toUpperCase();
            stockInfo = await dataModel.findOne({ nseorbseSymbol: stockSymbol });

            if (stockInfo) {
                console.log("Found NSE/BSE Symbol", stockSymbol);
                const status = stockInfo.compliantStatusBusinessScreening;
                const reason = stockInfo.compliantStatusDebts === "PASS"
                    ? "It meets debt compliance norms."
                    : "It does not meet debt compliance norms.";

                aiResponse = `The stock ${stockSymbol} is ${status === "PASS" ? "Shariah-compliant ✅" : "Non-compliant ❌"}.\nReason: ${reason}`;

            } else {
                aiResponse = `Sorry, I could not find the compliance status of ${stockSymbol}.`;
                console.log("Requested NSE/BSE Symbol Not Found");
            }
        } else {
            // Send query to Together AI Llama 2 model
            const { data } = await axios.post(
                "https://api.together.xyz/v1/completions",
                {
                    model: "meta-llama/Llama-2-7b-chat-hf",
                    prompt: userQuery,
                    max_tokens: 100,
                    temperature: 0.7,
                },
                {
                    headers: {
                        Authorization: `Bearer ${TOGETHER_AI_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            aiResponse = data.choices[0].text.trim();
        }

        res.json({ response: aiResponse });
    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ error: "Something went wrong with AI." });
    }
});

export default router;