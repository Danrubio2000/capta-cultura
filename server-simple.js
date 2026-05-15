#!/usr/bin/env node
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// COMPREHENSIVE CULTURAL FOUNDATION DATABASE - Dynamic Generation
// Generates realistic cultural institutions based on configured type

function generateCulturalLeads(businessType = "Galeria de Arte", region = "Brasil") {
  const foundations = [
    "Instituto", "Fundação", "Centro", "Associação", "Coordenadoria",
    "Organização", "Plataforma", "Núcleo", "Espaço", "Coletivo"
  ];

  // Areas mapping by business type
  const areasMap = {
    "Galeria de Arte": ["Arte Contemporânea", "Arte Moderna", "Arte Digital", "Arte Clássica", "Fotografia", "Escultura", "Instalação", "Arte Urbana"],
    "Escola de Música": ["Música Clássica", "Jazz", "Música Popular", "Produção Musical", "Canto", "Instrumentos", "Composição", "Performance"],
    "Companhia de Dança": ["Dança Contemporânea", "Dança Clássica", "Dança Folclórica", "Dança Urbana", "Coreografia", "Performance", "Circo", "Teatro de Movimento"],
    "Companhia de Teatro": ["Teatro Clássico", "Teatro Moderno", "Teatro de Rua", "Teatro Infantil", "Dramaturgia", "Performance", "Comédia", "Drama"],
    "Produtora de Cinema": ["Cinema Documentário", "Ficção", "Animação", "Curta-metragem", "Roteiro", "Edição", "Produção Audiovisual", "Cinema Experimental"],
    "Biblioteca": ["Acervo Histórico", "Literatura Contemporânea", "Pesquisa", "Preservação", "Catalogação", "Educação", "Eventos Literários", "Arquivo Digital"],
    "Museu": ["Arte Sacra", "História Natural", "Arqueologia", "Antropologia", "Arte Moderna", "Ciência", "Educação", "Restauração"],
    "Centro Cultural": ["Cultura Geral", "Desenvolvimento Comunitário", "Educação Artística", "Preservação", "Pesquisa", "Inovação", "Expressão", "Patrimônio"]
  };

  const areas = areasMap[businessType] || ["Artes Visuais", "Música", "Dança", "Teatro", "Cinema"];

  const states = ["São Paulo", "Rio de Janeiro", "Minas Gerais", "Bahia", "Santa Catarina"];
  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Florianópolis", "Curitiba", "Brasília"];

  const artNames = [
    "Brasileira", "Contemporânea", "Moderna", "Popular", "Tradicional",
    "Pública", "Comunitária", "Digital", "Experimental", "Sustentável",
    "Acessível", "Inclusiva", "Autoral", "Coletiva", "Colaborativa"
  ];

  const organizations = [
    "Cultura", "Arte", "Desenvolvimento", "Preservação", "Educação",
    "Pesquisa", "Inovação", "Criatividade", "Expressão", "Patrimônio"
  ];

  const emailDomain = ["org", "org.br", "com.br", "net.br"][Math.floor(Math.random() * 4)];
  const leads = [];

  for (let i = 0; i < 150; i++) {
    const foundation = foundations[Math.floor(Math.random() * foundations.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const artName = artNames[Math.floor(Math.random() * artNames.length)];
    const org = organizations[Math.floor(Math.random() * organizations.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    const baseName = `${foundation} de ${artName} ${org}`;
    const baseScore = 60 + Math.floor(Math.random() * 35);
    const phone = `(${Math.floor(Math.random() * 85) + 11}) ${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`;

    leads.push({
      name: baseName,
      email: `contato@${baseName.toLowerCase().replace(/\s/g, "").replace(/à/g, "a").replace(/ã/g, "a").replace(/ç/g, "c").substring(0, 30)}.${emailDomain}`,
      website: `https://${baseName.toLowerCase().replace(/\s/g, "-").replace(/à/g, "a").replace(/ã/g, "a").replace(/ç/g, "c")}.${emailDomain}`,
      score: baseScore,
      phone: phone,
      area: area,
      businessType: businessType,
      region: region,
      state: state,
      city: city,
      address: `${Math.floor(Math.random() * 9000) + 1000} Rua de ${artName}, ${city}, ${state}`,
      verified: Math.random() > 0.2,
      foundDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      focus: ["Criação", "Preservação", "Educação", "Pesquisa", "Divulgação"][Math.floor(Math.random() * 5)]
    });
  }

  return leads;
}

// Cache for generated cultural leads by business type and region
const culturalLeadsCache = {};

function getCachedCulturalLeads(businessType, region) {
  const cacheKey = `${businessType}_${region}`;
  if (!culturalLeadsCache[cacheKey]) {
    culturalLeadsCache[cacheKey] = generateCulturalLeads(businessType, region);
  }
  return culturalLeadsCache[cacheKey];
}

function getMockFoundations(businessType = "Galeria de Arte", location = "Brasil") {
  const searchLocation = location.toLowerCase();

  // Map locations
  const locationMap = {
    "brasil": "Brasil",
    "sp": "São Paulo",
    "rj": "Rio de Janeiro",
    "mg": "Minas Gerais",
    "ba": "Bahia",
    "sc": "Santa Catarina",
    "são paulo": "São Paulo",
    "rio de janeiro": "Rio de Janeiro",
    "minas gerais": "Minas Gerais",
    "bahia": "Bahia",
    "santa catarina": "Santa Catarina"
  };

  const normalizedLocation = locationMap[searchLocation] || "Brasil";

  // Return foundations based on business type and location
  return getCachedCulturalLeads(businessType, normalizedLocation);
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
      const { keywords = "", location = "Brasil", type = "all", businessType = "Galeria de Arte" } = body;

      const leads = getMockFoundations(businessType, location);

      res.writeHead(200);
      res.end(JSON.stringify({
        leads,
        total: leads.length,
        query: { keywords, location, type, businessType }
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
