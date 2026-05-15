// Comprehensive translation system for CAPTA CULTURA secondary pages
const translationsPages = {
  pt: {},
  en: {},
  es: {},
  fr: {}
};

// Complete text mapping for all page content
const allTranslations = {
  pt: {
    "🎬 Tutorial Completo - CAPTA CULTURA": "🎬 Tutorial Completo - CAPTA CULTURA",
    "Encontre Financiadores para Seus Documentários, Filmes e Projetos de Arte": "Encontre Financiadores para Seus Documentários, Filmes e Projetos de Arte",
    "📋 Sumário": "📋 Sumário",
    "🎯 Introdução": "🎯 Introdução",
    "⚙️ Setup Inicial (3 minutos)": "⚙️ Setup Inicial (3 minutos)",
    "🔍 Buscar Fundações de Arte (8 minutos)": "🔍 Buscar Fundações de Arte (8 minutos)",
    "📧 Enviar Propostas para Fundações (10 minutos)": "📧 Enviar Propostas para Fundações (10 minutos)",
    "🎨 Criar Landing Page do Projeto (8 minutos)": "🎨 Criar Landing Page do Projeto (8 minutos)",
    "💡 Dicas para Aumentar Sucesso": "💡 Dicas para Aumentar Sucesso",
    "📚 Exemplos por Área": "📚 Exemplos por Área",
    "❓ Perguntas Frequentes": "❓ Perguntas Frequentes",
    "CAPTA CULTURA - Tutorial Completo": "CAPTA CULTURA - Tutorial Completo",
    "Desenvolvido com ❤️ para artistas, cineastas e criadores": "Desenvolvido com ❤️ para artistas, cineastas e criadores",
    "🎬 CAPTA - CULTURA - Demonstração": "🎬 CAPTA - CULTURA - Demonstração",
    "Veja como encontrar financiadores, enviar propostas e apresentar seus projetos artísticos": "Veja como encontrar financiadores, enviar propostas e apresentar seus projetos artísticos",
    "Bem-vindo ao CAPTA CULTURA": "Bem-vindo ao CAPTA CULTURA",
    "A solução completa para artistas, cineastas e criadores buscarem financiamento": "A solução completa para artistas, cineastas e criadores buscarem financiamento"
  },
  en: {
    "🎬 Tutorial Completo - CAPTA CULTURA": "🎬 Complete Tutorial - CAPTA CULTURA",
    "Encontre Financiadores para Seus Documentários, Filmes e Projetos de Arte": "Find Funders for Your Documentaries, Films and Art Projects",
    "📋 Sumário": "📋 Table of Contents",
    "🎯 Introdução": "🎯 Introduction",
    "⚙️ Setup Inicial (3 minutos)": "⚙️ Initial Setup (3 minutes)",
    "🔍 Buscar Fundações de Arte (8 minutos)": "🔍 Search Art Foundations (8 minutes)",
    "📧 Enviar Propostas para Fundações (10 minutos)": "📧 Send Proposals to Foundations (10 minutes)",
    "🎨 Criar Landing Page do Projeto (8 minutos)": "🎨 Create Project Landing Page (8 minutes)",
    "💡 Dicas para Aumentar Sucesso": "💡 Tips to Increase Success",
    "📚 Exemplos por Área": "📚 Examples by Area",
    "❓ Perguntas Frequentes": "❓ Frequently Asked Questions",
    "CAPTA CULTURA - Tutorial Completo": "CAPTA CULTURA - Complete Tutorial",
    "Desenvolvido com ❤️ para artistas, cineastas e criadores": "Made with ❤️ for artists, filmmakers and creators",
    "🎬 CAPTA - CULTURA - Demonstração": "🎬 CAPTA - CULTURA - Demo",
    "Veja como encontrar financiadores, enviar propostas e apresentar seus projetos artísticos": "See how to find funders, send proposals and present your artistic projects",
    "Bem-vindo ao CAPTA CULTURA": "Welcome to CAPTA CULTURA",
    "A solução completa para artistas, cineastas e criadores buscarem financiamento": "The complete solution for artists, filmmakers and creators to seek funding"
  },
  es: {
    "🎬 Tutorial Completo - CAPTA CULTURA": "🎬 Tutorial Completo - CAPTA CULTURA",
    "Encontre Financiadores para Seus Documentários, Filmes e Projetos de Arte": "Encuentre Financiadores para Sus Documentales, Películas y Proyectos de Arte",
    "📋 Sumário": "📋 Tabla de Contenidos",
    "🎯 Introdução": "🎯 Introducción",
    "⚙️ Setup Inicial (3 minutos)": "⚙️ Configuración Inicial (3 minutos)",
    "🔍 Buscar Fundações de Arte (8 minutos)": "🔍 Buscar Fundaciones de Arte (8 minutos)",
    "📧 Enviar Propostas para Fundações (10 minutos)": "📧 Enviar Propuestas a Fundaciones (10 minutos)",
    "🎨 Criar Landing Page do Projeto (8 minutos)": "🎨 Crear Landing Page del Proyecto (8 minutos)",
    "💡 Dicas para Aumentar Sucesso": "💡 Consejos para Aumentar el Éxito",
    "📚 Exemplos por Área": "📚 Ejemplos por Área",
    "❓ Perguntas Frequentes": "❓ Preguntas Frecuentes",
    "CAPTA CULTURA - Tutorial Completo": "CAPTA CULTURA - Tutorial Completo",
    "Desenvolvido com ❤️ para artistas, cineastas e criadores": "Hecho con ❤️ para artistas, cineastas y creadores",
    "🎬 CAPTA - CULTURA - Demonstração": "🎬 CAPTA - CULTURA - Demostración",
    "Veja como encontrar financiadores, enviar propostas e apresentar seus projetos artísticos": "Vea cómo encontrar financiadores, enviar propuestas y presentar sus proyectos artísticos",
    "Bem-vindo ao CAPTA CULTURA": "Bienvenido a CAPTA CULTURA",
    "A solução completa para artistas, cineastas e criadores buscarem financiamento": "La solución completa para artistas, cineastas y creadores para buscar financiamiento"
  },
  fr: {
    "🎬 Tutorial Completo - CAPTA CULTURA": "🎬 Tutoriel Complet - CAPTA CULTURA",
    "Encontre Financiadores para Seus Documentários, Filmes e Projetos de Arte": "Trouvez des Financeurs pour Vos Documentaires, Films et Projets Artistiques",
    "📋 Sumário": "📋 Table des Matières",
    "🎯 Introdução": "🎯 Introduction",
    "⚙️ Setup Inicial (3 minutos)": "⚙️ Configuration Initiale (3 minutes)",
    "🔍 Buscar Fundações de Arte (8 minutos)": "🔍 Rechercher des Fondations d'Art (8 minutes)",
    "📧 Enviar Propostas para Fundações (10 minutos)": "📧 Envoyer des Propositions aux Fondations (10 minutes)",
    "🎨 Criar Landing Page do Projeto (8 minutos)": "🎨 Créer une Landing Page du Projet (8 minutes)",
    "💡 Dicas para Aumentar Sucesso": "💡 Conseils pour Augmenter le Succès",
    "📚 Exemplos por Área": "📚 Exemples par Domaine",
    "❓ Perguntas Frequentes": "❓ Questions Fréquemment Posées",
    "CAPTA CULTURA - Tutorial Completo": "CAPTA CULTURA - Tutoriel Complet",
    "Desenvolvido com ❤️ para artistas, cineastas e criadores": "Fait avec ❤️ pour les artistes, cinéastes et créateurs",
    "🎬 CAPTA - CULTURA - Demonstração": "🎬 CAPTA - CULTURA - Démonstration",
    "Veja como encontrar financiadores, enviar propostas e apresentar seus projetos artísticos": "Voyez comment trouver des financeurs, envoyer des propositions et présenter vos projets artistiques",
    "Bem-vindo ao CAPTA CULTURA": "Bienvenue sur CAPTA CULTURA",
    "A solução completa para artistas, cineastas e criadores buscarem financiamento": "La solution complète pour les artistes, cinéastes et créateurs pour chercher un financement"
  }
};

// Replace all text in page with translations
function applyPageTranslations(lang = 'pt') {
  if (!allTranslations[lang]) lang = 'pt';
  const translations = allTranslations[lang];

  // Update page title
  document.title = translations["🎬 Tutorial Completo - CAPTA CULTURA"] || document.title;

  // Replace all text in body using innerHTML manipulation
  let html = document.documentElement.innerHTML;

  for (const [ptText, translatedText] of Object.entries(translations)) {
    // Use global replace for all occurrences
    const regex = new RegExp(ptText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(regex, translatedText);
  }

  document.documentElement.innerHTML = html;

  // Re-attach language selector event listener
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.value = lang;
    langSelector.removeEventListener('change', handleLanguageChange);
    langSelector.addEventListener('change', handleLanguageChange);
  }

  // Update html lang attribute
  document.documentElement.lang = lang;

  // Save preference
  localStorage.setItem('preferredLanguage', lang);
}

function handleLanguageChange(e) {
  applyPageTranslations(e.target.value);
}

// Auto-apply translations on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
  applyPageTranslations(savedLang);

  // Attach event listener to language selector
  const langSelector = document.getElementById('language-selector');
  if (langSelector) {
    langSelector.addEventListener('change', handleLanguageChange);
  }
});
