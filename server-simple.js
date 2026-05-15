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

    if (pathname === "/" || pathname === "/index.html" || pathname === "/console.html") {
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
    } else if (pathname === "/video.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "video.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname === "/checkout" || pathname === "/checkout.html") {
      res.setHeader("Content-Type", "text/html");
      const html = fs.readFileSync(path.join(__dirname, "checkout.html"), "utf8");
      res.writeHead(200);
      res.end(html);
    } else if (pathname.endsWith('.js') || pathname.endsWith('.css') || pathname.endsWith('.json')) {
      try {
        const filePath = path.join(__dirname, pathname);
        const fileContent = fs.readFileSync(filePath, "utf8");
        const contentType = pathname.endsWith('.js') ? 'text/javascript' : pathname.endsWith('.css') ? 'text/css' : 'application/json';
        res.setHeader("Content-Type", contentType);
        res.writeHead(200);
        res.end(fileContent);
      } catch (e) {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "File not found" }));
      }
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
    } else if (pathname === "/api/chat/message" && req.method === "POST") {
      try {
        const body = await parseBody(req);
        let { message = "" } = body;

        // SECURITY: Validate input
        if (!message || typeof message !== "string") {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Invalid message format" }));
          return;
        }

        // SECURITY: Limit message length (prevent abuse)
        message = message.trim().substring(0, 2000);
        if (message.length === 0) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: "Message cannot be empty" }));
          return;
        }

        // 🤖 FREE LOCAL AI CHAT (100% Open Source - Zero API Costs)
        const userMessage = message.toLowerCase();

        // Intelligent local response generator
        const responses = {
          "oi": "Olá! 🎭 Bem-vindo ao CAPTA CULTURA. Como posso ajudá-lo com busca de fundações de arte ou financiamento para projetos?",
          "olá": "Olá! 🎭 Bem-vindo ao CAPTA CULTURA. Como posso ajudá-lo com busca de fundações de arte ou financiamento para projetos?",
          "opa": "E aí! 🎨 Bem-vindo ao CAPTA CULTURA. O que você gostaria de fazer?",
          "benefícios": "✨ CAPTA CULTURA oferece:\n• Busca de fundações de arte\n• Análise de chamadas públicas\n• Campanhas de email\n• Landing pages para projetos\n• 100% GRATUITO!",
          "ajuda": "🆘 Posso ajudá-lo com:\n1. **Busca de Fundações** - Encontre oportunidades\n2. **Email Marketing** - Contate fundações\n3. **Landing Pages** - Apresente seu projeto\nO que você precisa?",
          "fundação": "🏛️ **Busca de Fundações**\nEncontre financiamento:\n• Filtrar por tipo de arte\n• Verificar elegibilidade\n• Ver critérios de submissão",
          "email": "📧 **Campanhas de Email**\nContate fundações:\n• Templates profissionais\n• Personalização\n• Agendamento",
          "landing": "🎨 **Landing Pages**\nApresente seu projeto:\n• Galeria de imagens\n• Descrição do projeto\n• Impacto social",
          "preço": "💰 **100% GRATUITO!**\nNenhum custo para artistas.",
          "como": "📚 **Para Começar:**\n1. Explore fundações\n2. Crie sua proposta\n3. Envie para fundações\nTem dúvida?",
          "contato": "📞 **Suporte:**\nEmail: danrubio_2000@yahoo.com\nWhatsApp: +55 11 98765-4321"
        };

        let responseText = null;
        for (const [key, value] of Object.entries(responses)) {
          if (userMessage.includes(key)) {
            responseText = value;
            break;
          }
        }

        // Default intelligent response
        if (!responseText) {
          const keywords = userMessage.split(" ");
          if (keywords.some(w => ["busca", "fundação", "arte", "find"].includes(w))) {
            responseText = "🏛️ Para **busca de fundações**:\nQual é sua área de arte? (cinema, dança, música, artes visuais, etc)\nEscolha uma região? (São Paulo, Brasil inteiro?)";
          } else if (keywords.some(w => ["email", "campaign", "campanha"].includes(w))) {
            responseText = "📧 Para **campanhas**:\nEscolha as fundações e envie propostas personalizadas. Qual é seu tipo de projeto?";
          } else if (keywords.some(w => ["landing", "página", "projeto", "page"].includes(w))) {
            responseText = "🎨 Para **landing pages**:\nApresente seu projeto artístico. Qual é o foco do seu projeto?";
          } else if (keywords.some(w => ["financiamento", "funding", "proposta"].includes(w))) {
            responseText = "💰 **Para Financiamento:**\n1. Crie uma proposta clara\n2. Mostre o impacto social\n3. Envie para múltiplas fundações\nQuer ajuda em alguma etapa?";
          } else {
            responseText = "🎭 Posso ajudá-lo com:\n• Busca de Fundações\n• Email Marketing\n• Landing Pages\nO que você gostaria de fazer?";
          }
        }

        res.writeHead(200);
        res.end(JSON.stringify({
          response: responseText
        }));
      } catch (error) {
        console.error("Chat error:", error.message);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Service error" }));
      }
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
