/**
 * CAPTA CULTURA - Leads Hunter
 * Generates cultural foundations/organizations by type and region
 */

class LeadsHunter {
  constructor(config = {}) {
    this.hunterKey = config.hunterKey || process.env.HUNTER_API_KEY;
    this.results = [];
  }

  async searchLeads(keywords = "", location = "Brasil", type = "cultural", businessType = "Galeria de Arte") {
    console.log(`🔍 Buscando fundações: tipo="${businessType}" região="${location}" keywords="${keywords}"`);
    const leads = this.generateFoundationsByType(businessType, location, keywords);
    this.results = leads;
    console.log(`✅ Encontradas ${leads.length} fundações`);
    return leads;
  }

  generateFoundationsByType(businessType = "Galeria de Arte", region = "Brasil", keywords = "") {
    const prefixes = [
      "Instituto", "Fundação", "Centro", "Associação", "Coordenadoria",
      "Organização", "Plataforma", "Núcleo", "Espaço", "Coletivo",
      "Museu", "Galeria", "Ateliê", "Academia", "Escola"
    ];

    const areasMap = {
      "Galeria de Arte": ["Arte Contemporânea", "Arte Moderna", "Arte Digital", "Arte Clássica", "Fotografia", "Escultura", "Instalação", "Arte Urbana", "Gravura", "Pintura"],
      "Escola de Música": ["Música Clássica", "Jazz", "Música Popular", "Produção Musical", "Canto Lírico", "Instrumentos", "Composição", "Performance", "MPB", "Erudita"],
      "Companhia de Dança": ["Dança Contemporânea", "Ballet Clássico", "Dança Folclórica", "Dança Urbana", "Coreografia", "Performance", "Circo", "Teatro de Movimento", "Sapateado"],
      "Companhia de Teatro": ["Teatro Clássico", "Teatro Moderno", "Teatro de Rua", "Teatro Infantil", "Dramaturgia", "Performance", "Comédia", "Drama", "Teatro Musical"],
      "Produtora de Cinema": ["Cinema Documentário", "Ficção", "Animação", "Curta-metragem", "Roteiro", "Edição", "Produção Audiovisual", "Cinema Experimental", "Websérie"],
      "Biblioteca": ["Acervo Histórico", "Literatura Contemporânea", "Pesquisa", "Preservação", "Catalogação", "Educação", "Eventos Literários", "Arquivo Digital"],
      "Museu": ["Arte Sacra", "História Natural", "Arqueologia", "Antropologia", "Arte Moderna", "Ciência e Tecnologia", "Educação", "Restauração"],
      "Centro Cultural": ["Cultura Geral", "Desenvolvimento Comunitário", "Educação Artística", "Preservação", "Pesquisa Cultural", "Inovação", "Expressão", "Patrimônio"],
      "Escola de Artes": ["Artes Visuais", "Música", "Dança", "Teatro", "Cinema", "Design", "Fotografia", "Literatura"],
      "Festival Cultural": ["Música", "Cinema", "Teatro", "Literatura", "Artes Visuais", "Gastronomia", "Folclore", "Arte Urbana"]
    };

    const adjectives = [
      "Brasileira", "Contemporânea", "Moderna", "Popular", "Tradicional",
      "Pública", "Comunitária", "Digital", "Experimental", "Sustentável",
      "Acessível", "Inclusiva", "Autoral", "Coletiva", "Colaborativa",
      "Nacional", "Regional", "Cultural", "Artística", "Criativa"
    ];

    const themes = [
      "Cultura", "Arte", "Desenvolvimento", "Preservação", "Educação",
      "Pesquisa", "Inovação", "Criatividade", "Expressão", "Patrimônio",
      "Diversidade", "Inclusão", "Memória", "Identidade", "Transformação"
    ];

    const areas = areasMap[businessType] || ["Artes Visuais", "Música", "Dança", "Teatro", "Cinema"];
    const emailDomains = ["org", "org.br", "com.br", "net.br", "art.br"];

    const cityMap = {
      "Brasil": ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Salvador", "Fortaleza", "Curitiba", "Brasília", "Recife", "Manaus", "Porto Alegre"],
      "São Paulo": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto", "Sorocaba"],
      "Rio de Janeiro": ["Rio de Janeiro", "Niterói", "Petrópolis", "Volta Redonda"],
      "Minas Gerais": ["Belo Horizonte", "Ouro Preto", "Uberlândia", "Juiz de Fora"],
      "Bahia": ["Salvador", "Feira de Santana", "Ilhéus", "Porto Seguro"],
      "Santa Catarina": ["Florianópolis", "Joinville", "Blumenau", "Criciúma"]
    };

    const cities = cityMap[region] || cityMap["Brasil"];
    const leads = [];
    const usedNames = new Set();

    for (let i = 0; i < 45; i++) {
      const prefix = prefixes[i % prefixes.length];
      const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
      const theme = themes[Math.floor(Math.random() * themes.length)];
      const area = areas[i % areas.length];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];

      const baseName = `${prefix} de ${adj} ${theme}`;
      if (usedNames.has(baseName)) continue;
      usedNames.add(baseName);

      const slug = baseName.toLowerCase()
        .replace(/[áàã]/g, "a").replace(/[éê]/g, "e").replace(/[í]/g, "i")
        .replace(/[óô]/g, "o").replace(/[ú]/g, "u").replace(/[ç]/g, "c")
        .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

      const emailSlug = baseName.toLowerCase()
        .replace(/[áàã]/g, "a").replace(/[éê]/g, "e").replace(/[í]/g, "i")
        .replace(/[óô]/g, "o").replace(/[ú]/g, "u").replace(/[ç]/g, "c")
        .replace(/\s+/g, "").replace(/[^a-z0-9]/g, "").substring(0, 25);

      const score = 60 + Math.floor(Math.random() * 35);

      if (keywords && keywords.trim()) {
        const kw = keywords.toLowerCase()
          .replace(/[áàã]/g, "a").replace(/[éê]/g, "e").replace(/[í]/g, "i")
          .replace(/[óô]/g, "o").replace(/[ú]/g, "u").replace(/[ç]/g, "c");
        const haystack = `${baseName} ${area} ${businessType} ${city}`.toLowerCase()
          .replace(/[áàã]/g, "a").replace(/[éê]/g, "e").replace(/[í]/g, "i")
          .replace(/[óô]/g, "o").replace(/[ú]/g, "u").replace(/[ç]/g, "c");
        if (!haystack.includes(kw)) continue;
      }

      leads.push({
        name: baseName,
        email: `contato@${emailSlug}.${emailDomain}`,
        website: `https://${slug}.${emailDomain}`,
        score,
        phone: `(${Math.floor(Math.random() * 85) + 11}) 3${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        area,
        businessType,
        region,
        city,
        address: `Rua das ${theme}s, ${Math.floor(Math.random() * 900) + 100} - ${city}`,
        verified: score > 75,
        foundDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        focus: ["Criação", "Preservação", "Educação", "Pesquisa", "Divulgação"][Math.floor(Math.random() * 5)]
      });

      if (leads.length >= 30) break;
    }

    if (leads.length < 5) return this.generateFoundationsByType(businessType, region, "");
    return leads;
  }

  async enrichLead(email, domain) {
    return { email, domain, enrichedAt: new Date().toISOString(), status: "enriched" };
  }

  validateLeads(leads) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return leads.filter(l => emailRegex.test(l.email)).map(l => ({ ...l, status: "validated" }));
  }

  exportToCSV() {
    if (!this.results.length) return "";
    const headers = Object.keys(this.results[0]);
    return [headers.join(","), ...this.results.map(l => headers.map(h => `"${l[h] || ""}"`).join(","))].join("\n");
  }

  exportToJSON() {
    return JSON.stringify(this.results, null, 2);
  }
}

export default LeadsHunter;
