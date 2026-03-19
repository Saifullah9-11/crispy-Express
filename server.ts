import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/menu", (req, res) => {
    const menuPath = path.join(__dirname, "src/data/menu.json");
    const menuData = JSON.parse(fs.readFileSync(menuPath, "utf-8"));
    res.json(menuData);
  });

  app.post("/api/checkout", async (req, res) => {
    // Placeholder for Stripe integration
    // In a real app, you'd use stripe.paymentIntents.create
    const { items, total } = req.body;
    console.log("Processing checkout for:", items, "Total:", total);
    
    res.json({ 
      success: true, 
      clientSecret: "pi_placeholder_secret",
      message: "Payment intent created (Mock)"
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
