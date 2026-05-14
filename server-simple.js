#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Mock foundation database for demo
const mockFoundations = {
  "fundações cultura": [
    { name: "Instituto Brasil Cultura", email: "contato@brasilcultura.org", website: "https://brasilcultura.org", score: 92, phone: "(11) 555-0101", area: "Artes Visuais" },
    { name: "Fundação São Paulo de Arte", email: "info@sparte.org", website: "https://sparte.org", score: 88, phone: "(11) 555-0102", area: "Música" },
    { name: "Centro de Cultura Contemporânea", email: "contato@cccontemporânea.org", website: "https://cccontemporanea.org", score: 85, phone: "(11) 555-0103", area: "Artes Visuais" },
    { name: "Fundação de Preservação do Patrimônio", email: "info@patrimonio.org", website: "https://patrimonio.org", score: 82, phone: "(11) 555-0104", area: "Patrimônio" },
    { name: "Instituto de Artes Cênicas", email: "contato@artes.org", website: "https://artescênicas.org", score: 79, phone: "(11) 555-0105", area: "Teatro" }
  ],
  "fundações arte educação": [
    { name: "Fundação Educação em Artes", email: "contato@arteducacao.org", website: "https://arteducacao.org", score: 90, phone: "(11) 555-0201", area: "Educação" },
    { name: "Instituto de Artistas Brasileiros", email: "info@artistas.org", website: "https://artistasbrasileiros.org", score: 87, phone: "(11) 555-0202", area: "Artes" },
    { name: "Centro de Desenvolvimento Cultural", email: "contato@desenvolvimentocultural.org", website: "https://desenvolvimentocultural.org", score: 84, phone: "(11) 555-0203", area: "Desenvolvimento" }
  ],
  "fundações brasil patrimônio": [
    { name: "Fundação Nacional do Patrimônio", email: "contato@patrimonio.gov.br", website: "https://patrimonio.gov.br", score: 95, phone: "(61) 555-0301", area: "Patrimônio Nacional" },
    { name: "Instituto de Preservação Histórica", email: "info@preservacao.org", website: "https://preservacao.org", score: 91, phone: "(21) 555-0302", area: "História" },
    { name: "Fundação de Conservação de Sítios", email: "contato@conservacao.org", website: "https://conservacao.org", score: 88, phone: "(31) 555-0303", area: "Conservação" }
  ]
};

function getMockFoundations(keywords, location) {
  const searchKey = `${keywords.toLowerCase()} ${location.toLowerCase()}`;

  // Try exact match first
  if (mockFoundations[searchKey]) {
    return mockFoundations[searchKey];
  }

  // Try partial matches
  for (const key in mockFoundations) {
    if (key.includes(keywords.toLowerCase()) || searchKey.includes("fundação")) {
      return mockFoundations[key];
    }
  }

  // Default: return some generic results
  return [
    { name: `Fundação de ${keywords} - ${location}`, email: "contato@fundacao.org", website: "https://fundacao.org", score: 75, phone: "(XX) 555-0001", area: keywords },
    { name: `Instituto de ${keywords} Brasil`, email: "info@instituto.org", website: "https://instituto.org", score: 70, phone: "(XX) 555-0002", area: keywords }
  ];
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    // CORS Headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Content-Type", "application/json");

    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (req.method === "OPTIONS") {
      res.writeHead(200);
      res.end();
      return;
    }

    if (pathname === "/" || pathname === "/index.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "console.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/landing.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "landing.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/tutorial.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "tutorial.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/api/test") {
      res.writeHead(200);
      res.end(JSON.stringify({ ok: true }));
    } else if (pathname === "/api/leads/search" && req.method === "POST") {
      const body = await parseBody(req);
      const { keywords = "", location = "Brasil", type = "all" } = body;

      const leads = getMockFoundations(keywords, location);

      res.writeHead(200);
      res.end(JSON.stringify({
        leads,
        total: leads.length,
        query: { keywords, location, type }
      }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  } catch (error) {
    console.error("Server error:", error);
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error", message: error.message }));
  }
});

export default server;

if (!process.env.VERCEL) {
  server.listen(3000, () => {
    console.log("✅ Server running on http://localhost:3000");
  });
}
