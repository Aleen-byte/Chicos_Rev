"use client";

import { useState } from "react";

// ─────────────────────────────────────────────
// DADOS: RESUMO
// ─────────────────────────────────────────────
const topics = [
  {
    id: "aula16", aula: "Aula 16–17", titulo: "Árvore de Recursão & Expansão",
    cor: "#818cf8", emoji: "🌳",
    secoes: [
      {
        subtitulo: "O que é a Árvore de Recursão?",
        conteudo: [
          "Técnica para gerar uma **boa suposição** para a solução de uma recorrência, depois verificada pelo método de substituição.",
          "Desenhamos uma árvore onde cada **nó** representa o tamanho do subproblema em determinada profundidade.",
          "A solução = **soma de todos os passos de todos os níveis** da árvore.",
          "Dois aspectos-chave: **altura da árvore** e **número de passos por nível**.",
        ],
      },
      {
        subtitulo: "Exemplo clássico — MergeSort: T(n) = 2T(n/2) + n",
        conteudo: [
          "Cada nível soma **n** passos (total por nível é constante).",
          "Altura da árvore: **h = log₂n** (pois n/2ʰ = 1).",
          "Total de passos: **h × n = n log n → O(n log n)**.",
        ],
      },
      {
        subtitulo: "Método da Expansão — Passos",
        conteudo: [
          "**1.** Expandir a recorrência várias vezes substituindo o termo recursivo.",
          "**2.** Identificar o **padrão** geral (ex: T(n) = T(n−k) + 3k).",
          "**3.** Parar quando chegar ao **caso base** (n−k = 1 → k = n−1).",
          "**4.** Simplificar a soma resultante.",
        ],
      },
      {
        subtitulo: "Exemplos de Expansão",
        conteudo: [
          "**T(n) = T(n−1) + 3** → T(n) = T(1) + 3(n−1) → **O(n)**",
          "**T(n) = T(n/2) + 5** → T(n) = c + 5 log n → **O(log n)**",
          "**T(n) = 2T(n−1) + 1** → T(n) = 2ⁿ − 1 → **O(2ⁿ)**",
          "**T(n) = 2T(n/2) + dn** → T(n) = dn·log n + cn → **O(n log n)**",
        ],
      },
    ],
    dica: "Na expansão: identifique o padrão T(n) = T(n−k) + f(k), substitua k pelo valor do caso base e simplifique a soma.",
  },
  {
    id: "aula20", aula: "Aula 20", titulo: "Método Mestre",
    cor: "#38bdf8", emoji: "👑",
    secoes: [
      {
        subtitulo: "Formato da Recorrência",
        conteudo: [
          "Aplica-se a recorrências: **T(n) = aT(n/b) + f(n)**",
          "Onde **a ≥ 1** e **b > 1** são constantes, f(n) é assintoticamente positiva.",
          "Típica de algoritmos **Dividir e Conquistar**.",
        ],
      },
      {
        subtitulo: "Os 3 Casos do Teorema Mestre",
        conteudo: [
          "**Caso 1:** f(n) = O(n^(log_b a − ε)) → f(n) **menor** → **T(n) = Θ(n^log_b a)**",
          "**Caso 2:** f(n) = Θ(n^log_b a) → funções **iguais** → **T(n) = Θ(n^log_b a · log n)**",
          "**Caso 3:** f(n) = Ω(n^(log_b a + ε)) e af(n/b) ≤ c·f(n) → f(n) **maior** → **T(n) = Θ(f(n))**",
        ],
      },
      {
        subtitulo: "Estratégia Passo a Passo",
        conteudo: [
          "**Passo 1:** Identificar a, b e f(n).",
          "**Passo 2:** Calcular n^log_b(a).",
          "**Passo 3:** Comparar f(n) com n^log_b(a) assintoticamente.",
          "**Passo 4:** Aplicar o caso correspondente.",
        ],
      },
      {
        subtitulo: "Exemplos Resolvidos",
        conteudo: [
          "**T(n) = 16T(n/4) + n** → n^log_4(16)=n² → f(n)=n < n² → **Caso 1 → Θ(n²)**",
          "**T(n) = T(2n/3) + 1** → n^log_(3/2)(1)=1 → f(n)=1=Θ(1) → **Caso 2 → Θ(log n)**",
          "**T(n) = 3T(n/4) + n·log n** → n^log_4(3)≈n^0.79 < n·log n → **Caso 3 → Θ(n log n)**",
          "**T(n) = 2T(n/2) + n·log n** → **Não se aplica!** Diferença não é polinomial.",
        ],
      },
    ],
    dica: "A chave é comparar f(n) com n^log_b(a). Quem 'ganhar' polinomialmente determina a solução. Se empatarem, multiplica por log n.",
  },
  {
    id: "aula22", aula: "Aula 22", titulo: "Divisão e Conquista",
    cor: "#34d399", emoji: "⚔️",
    secoes: [
      {
        subtitulo: "Balanceamento",
        conteudo: [
          "A maioria dos algoritmos D&C usa **balanceamento**: dividir o problema em partes **aproximadamente iguais**.",
          "Sem balanceamento (1 e n−1): T(n) = T(n−1) + n − 1 → **O(n²)**.",
          "Com balanceamento (n/2 e n/2): **O(n log n)**.",
          "Balanceamento também aparece em **árvores** e **servidores** (carga).",
        ],
      },
      {
        subtitulo: "MergeSort",
        conteudo: [
          "**Dividir:** Quebrar o vetor ao meio recursivamente até vetores de 1 elemento.",
          "**Intercalar (merge):** Unir dois vetores ordenados em um terceiro.",
          "**Recorrência:** T(n) = 2T(n/2) + n → **Θ(n log n)** pelo Caso 2 do Mestre.",
          "**QuickSort:** escolhe pivô e particiona; recursivo nas partições.",
        ],
      },
      {
        subtitulo: "Máximo e Mínimo Simultâneos",
        conteudo: [
          "**Ingênuo:** Dois passes → 2(n−1) comparações.",
          "**D&C:** Dividir em S1 e S2, encontrar (min1,max1) e (min2,max2), combinar.",
          "**Recorrência:** T(n) = 2T(n/2) + 2, T(2) = 1 → **T(n) = (3/2)n − 2**.",
          "D&C economiza ~25% de comparações em relação ao método ingênuo.",
        ],
      },
    ],
    dica: "MergeSort: T(n) = 2T(n/2) + n → Caso 2 → Θ(n log n). MaxMin D&C: T(n) = (3/2)n − 2, provado por indução.",
  },
  {
    id: "aula24", aula: "Aula 24", titulo: "Método Guloso & Huffman (Intro)",
    cor: "#fbbf24", emoji: "🏆",
    secoes: [
      {
        subtitulo: "O que é o Método Guloso?",
        conteudo: [
          "Em cada passo, faz-se a **escolha ótima local** esperando obter uma solução ótima global.",
          "Útil para **problemas de otimização combinatória** solucionáveis por sequência de decisões.",
          "**Nem sempre** garante ótimo global — mas quando garante, é simples e eficiente.",
        ],
      },
      {
        subtitulo: "Vantagens e Desvantagens",
        conteudo: [
          "✅ **Vantagens:** Simples, fácil implementação, eficientes quando funcionam.",
          "❌ **Desvantagens:** Nem sempre ótimo global; podem fazer escolhas locais ruins a longo prazo.",
        ],
      },
      {
        subtitulo: "Aplicações Clássicas",
        conteudo: [
          "**Troco** (menor número de moedas), **Mochila fracionária** (maximizar valor).",
          "**Códigos de Huffman** (compressão ótima de dados).",
          "**Árvore Geradora Mínima** — Kruskal e Prim.",
          "**Caminhos mais curtos** — Dijkstra.",
        ],
      },
      {
        subtitulo: "Huffman — Conceitos Fundamentais",
        conteudo: [
          "**Ideia:** Usar códigos **curtos** para caracteres frequentes e **longos** para os raros.",
          "**Propriedade de prefixo:** Nenhum código é prefixo de outro → decodificação única.",
          "**Custo total:** Σ(comprimento_do_código × frequência_do_símbolo).",
          "Redução típica: **20% a 90%** do tamanho original.",
        ],
      },
    ],
    dica: "Guloso ≠ ótimo sempre. Onde funciona: Huffman ✓, Kruskal ✓, Dijkstra ✓. Onde falha: Mochila 0/1 (requer Prog. Dinâmica).",
  },
  {
    id: "aula2526", aula: "Aula 25–26", titulo: "Algoritmo de Huffman (Detalhes)",
    cor: "#f472b6", emoji: "🔡",
    secoes: [
      {
        subtitulo: "Construção da Árvore de Huffman",
        conteudo: [
          "**Passo 1:** Cada símbolo vira uma árvore com um único nó (floresta inicial).",
          "**Passo 2:** Selecionar as **duas árvores com menor frequência** da floresta.",
          "**Passo 3:** Uni-las em nova árvore (novo nó raiz, frequência = soma das duas).",
          "**Passo 4:** Repetir por **n−1 iterações** até restar uma árvore.",
          "Código = sequência de bits da raiz à folha (esquerda=0, direita=1).",
        ],
      },
      {
        subtitulo: "Exemplo Prático (a–f)",
        conteudo: [
          "Frequências: a=45k, b=13k, c=12k, d=16k, e=9k, f=5k.",
          "Código fixo (3 bits): arquivo = 300.000 bits.",
          "Huffman: a=0 (1 bit), c=100, b=101, d=110... → ≈ **224.000 bits** (25% menor).",
        ],
      },
      {
        subtitulo: "Decodificação",
        conteudo: [
          "Lê bit a bit até formar um **código válido** (propriedade de prefixo garante sem ambiguidade).",
          "Requer a **mesma árvore** usada na codificação.",
        ],
      },
      {
        subtitulo: "Huffman por Palavras",
        conteudo: [
          "Por **caracteres**: comprime para ~60% do original.",
          "Por **palavras**: comprime para ~25% do original.",
          "Espaço simples representado implicitamente no texto comprimido.",
        ],
      },
    ],
    dica: "Huffman é construído de baixo para cima: os dois de menor frequência sempre se unem. Use min-heap para O(n log n).",
  },
  {
    id: "aula27", aula: "Aula 27", titulo: "Kruskal — Árvore Geradora Mínima",
    cor: "#f87171", emoji: "🕸️",
    secoes: [
      {
        subtitulo: "Árvore Geradora Mínima (AGM)",
        conteudo: [
          "Dado um grafo **conectado e não-direcionado** com pesos, a AGM conecta todos os vértices com **custo total mínimo**.",
          "Uma AGM de n vértices tem exatamente **n−1 arestas** e é acíclica.",
          "**Aplicações:** Redes de internet/elétrica/transporte, segmentação de imagens, otimização de rotas.",
        ],
      },
      {
        subtitulo: "Algoritmo de Kruskal",
        conteudo: [
          "**Ordenar** todas as arestas por peso crescente (fila de prioridade).",
          "Para cada aresta (v,w): se v e w em **componentes diferentes** → adicionar à AGM.",
          "Se v e w no **mesmo componente** → descartar (formaria ciclo).",
          "Repete até a AGM ter **n−1 arestas**.",
          "**Complexidade:** O(m log n), onde m = número de arestas.",
        ],
      },
      {
        subtitulo: "Estrutura Union-Find",
        conteudo: [
          "Usada para verificar se dois vértices estão no **mesmo componente** em O(α(n)) ≈ O(1).",
          "Sem Union-Find: verificação ingênua O(n) por aresta → O(m·n) total.",
          "Com Union-Find: complexidade dominante é a **ordenação → O(m log n)**.",
          "Kruskal é especialmente eficiente em **grafos esparsos** (m ≈ n).",
        ],
      },
    ],
    dica: "Kruskal: ordena arestas por peso, adiciona a menor que não crie ciclo. Union-Find é essencial para eficiência O(m log n).",
  },
];

// ─────────────────────────────────────────────
// DADOS: QUESTÕES (25 no total)
// ─────────────────────────────────────────────
const questoes = [
  // ── EXPANSÃO (Q1–Q4) ──────────────────────
  {
    id: 1, tema: "Expansão", cor: "#818cf8", dificuldade: "Fácil",
    enunciado: "Resolva pelo método da expansão:",
    formula: "T(n) = T(n−1) + 5,   T(1) = 1",
    opcoes: ["O(log n)", "O(n²)", "O(n)", "O(2ⁿ)"],
    correta: 2,
    gabarito: {
      resposta: "O(n)",
      passos: [
        "Expandindo: T(n) = T(n−1) + 5",
        "T(n) = T(n−2) + 2·5  →  T(n) = T(n−3) + 3·5",
        "Padrão: T(n) = T(n−k) + 5k",
        "Caso base: n−k = 1  →  k = n−1",
        "T(n) = T(1) + 5(n−1) = 1 + 5n − 5 = 5n − 4",
        "Complexidade: Θ(n)",
      ],
      conclusao: "A cada nível somamos uma constante 5, e fazemos isso n−1 vezes. Crescimento linear.",
    },
  },
  {
    id: 2, tema: "Expansão", cor: "#818cf8", dificuldade: "Fácil",
    enunciado: "Determine a complexidade pelo método da expansão:",
    formula: "T(n) = T(n/2) + 1,   T(1) = 0",
    opcoes: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
    correta: 1,
    gabarito: {
      resposta: "O(log n)",
      passos: [
        "Expandindo: T(n) = T(n/2) + 1  →  T(n/4) + 2  →  T(n/8) + 3",
        "Padrão: T(n) = T(n/2ᵏ) + k",
        "Caso base: n/2ᵏ = 1  →  k = log₂n",
        "T(n) = T(1) + log n = log n",
        "Complexidade: Θ(log n)",
      ],
      conclusao: "A cada expansão dividimos n por 2. O número de expansões até o caso base é exatamente log₂n.",
    },
  },
  {
    id: 3, tema: "Expansão", cor: "#818cf8", dificuldade: "Médio",
    enunciado: "Resolva pelo método da expansão:",
    formula: "T(n) = 2T(n−1) + 1,   T(1) = 1",
    opcoes: ["O(n)", "O(n²)", "O(n log n)", "O(2ⁿ)"],
    correta: 3,
    gabarito: {
      resposta: "O(2ⁿ)",
      passos: [
        "T(n) = 2[2T(n−2)+1]+1 = 2²T(n−2) + 2 + 1",
        "T(n) = 2³T(n−3) + 4 + 2 + 1",
        "Padrão: T(n) = 2ⁱT(n−i) + 2ⁱ⁻¹+...+1",
        "Caso base i = n−1: T(n) = 2ⁿ⁻¹·1 + (2ⁿ⁻¹−1) = 2ⁿ − 1",
        "Complexidade: Θ(2ⁿ)",
      ],
      conclusao: "O fator ×2 em 2T(n−1) faz a solução explodir exponencialmente. Recorrências assim são muito caras!",
    },
  },
  {
    id: 4, tema: "Expansão", cor: "#818cf8", dificuldade: "Médio",
    enunciado: "Use expansão para encontrar a forma fechada:",
    formula: "T(1) = 1,   T(n) = T(n/3) + n",
    opcoes: ["O(log n)", "O(n log n)", "O(n)", "O(n²)"],
    correta: 2,
    gabarito: {
      resposta: "O(n)",
      passos: [
        "T(n) = T(n/3) + n",
        "T(n) = T(n/9) + n/3 + n",
        "T(n) = T(n/3ᵏ) + n(1 + 1/3 + 1/9 + ... + 1/3^(k-1))",
        "Caso base: n/3ᵏ = 1  →  k = log₃n",
        "A soma geométrica converge: n · Σ(1/3)ⁱ  ≤  n · 1/(1−1/3) = 3n/2",
        "Complexidade: Θ(n)",
      ],
      conclusao: "A soma n + n/3 + n/9 + ... é uma série geométrica que converge para 3n/2. O termo dominante é o primeiro nível: n.",
    },
  },

  // ── MÉTODO MESTRE (Q5–Q9) ─────────────────
  {
    id: 5, tema: "Método Mestre", cor: "#38bdf8", dificuldade: "Fácil",
    enunciado: "Use o Método Mestre:",
    formula: "T(n) = 4T(n/2) + n",
    opcoes: ["O(n log n)", "O(n²)", "O(n)", "O(n² log n)"],
    correta: 1,
    gabarito: {
      resposta: "Θ(n²)",
      passos: [
        "a=4, b=2, f(n)=n",
        "n^log₂4 = n²",
        "f(n)=n = O(n^(2−1)) → polinomialmente menor",
        "Caso 1 → T(n) = Θ(n²)",
      ],
      conclusao: "f(n)=n é muito menor que n². O trabalho dominante está na recursão, não na combinação.",
    },
  },
  {
    id: 6, tema: "Método Mestre", cor: "#38bdf8", dificuldade: "Fácil",
    enunciado: "Aplique o Método Mestre (recorrência do MergeSort):",
    formula: "T(n) = 2T(n/2) + n",
    opcoes: ["O(n)", "O(n²)", "O(n log n)", "O(log n)"],
    correta: 2,
    gabarito: {
      resposta: "Θ(n log n)",
      passos: [
        "a=2, b=2, f(n)=n",
        "n^log₂2 = n¹ = n",
        "f(n) = Θ(n) = Θ(n^log_b a)  → funções iguais",
        "Caso 2 → T(n) = Θ(n · log n)",
      ],
      conclusao: "Recorrência clássica do MergeSort! Quando f(n) e n^log_b(a) empatam, multiplica-se por log n.",
    },
  },
  {
    id: 7, tema: "Método Mestre", cor: "#38bdf8", dificuldade: "Médio",
    enunciado: "Qual a complexidade pelo Método Mestre?",
    formula: "T(n) = 3T(n/4) + n·log n",
    opcoes: ["O(n log n)", "O(n^log₄3)", "O(n²)", "Não se aplica"],
    correta: 0,
    gabarito: {
      resposta: "Θ(n log n)",
      passos: [
        "a=3, b=4, f(n)=n·log n",
        "n^log₄3 ≈ n^0.792",
        "f(n)=n·log n é polinomialmente maior que n^0.792",
        "Regularidade: 3·(n/4)·log(n/4) ≤ (3/4)·n·log n  →  c=3/4 < 1 ✓",
        "Caso 3 → T(n) = Θ(n log n)",
      ],
      conclusao: "f(n) domina. A condição de regularidade (af(n/b) ≤ c·f(n)) deve ser sempre verificada no Caso 3.",
    },
  },
  {
    id: 8, tema: "Método Mestre", cor: "#38bdf8", dificuldade: "Difícil",
    enunciado: "Para qual recorrência o Método Mestre NÃO se aplica?",
    formula: "Analise as alternativas:",
    opcoes: [
      "T(n) = 4T(n/2) + n²",
      "T(n) = 2T(n/2) + n·log n",
      "T(n) = 3T(n/3) + n",
      "T(n) = T(n/2) + 1",
    ],
    correta: 1,
    gabarito: {
      resposta: "T(n) = 2T(n/2) + n·log n",
      passos: [
        "a=2, b=2  →  n^log₂2 = n",
        "f(n) = n·log n  vs  n^log_b(a) = n",
        "f(n)/n^log_b(a) = log n",
        "log n não é Ω(nᵉ) para nenhum ε > 0 — cresce mais lento que qualquer polinômio",
        "Diferença não é polinomial → lacuna entre Casos 2 e 3 → Mestre inaplicável",
      ],
      conclusao: "O Mestre exige diferença POLINOMIAL. Diferença apenas logarítmica cai na 'lacuna' entre os casos 2 e 3.",
    },
  },
  {
    id: 9, tema: "Método Mestre", cor: "#38bdf8", dificuldade: "Médio",
    enunciado: "Um algoritmo divide o problema em 9 subproblemas de tamanho n/3 e combina em O(n²). Qual sua complexidade?",
    formula: "T(n) = 9T(n/3) + n²",
    opcoes: ["Θ(n²)", "Θ(n² log n)", "Θ(n^log₃9)", "Θ(n³)"],
    correta: 1,
    gabarito: {
      resposta: "Θ(n² log n)",
      passos: [
        "a=9, b=3, f(n)=n²",
        "n^log₃9 = n^2 = n²",
        "f(n) = n² = Θ(n^log_b a)  → funções iguais",
        "Caso 2 → T(n) = Θ(n² · log n)",
      ],
      conclusao: "n^log₃9 = n^2 = f(n). Empate → Caso 2 → multiplica por log n. Este é o exercício 3 da aula 20!",
    },
  },

  // ── DIVISÃO E CONQUISTA (Q10–Q13) ─────────
  {
    id: 10, tema: "Divisão e Conquista", cor: "#34d399", dificuldade: "Fácil",
    enunciado: "Por que o MergeSort é assintoticamente mais rápido que o SelectionSort?",
    formula: "SelectionSort: T(n)=T(n−1)+n−1  |  MergeSort: T(n)=2T(n/2)+n",
    opcoes: [
      "MergeSort usa menos memória auxiliar",
      "MergeSort é O(n log n) pelo balanceamento; SelectionSort é O(n²) sem balanceamento",
      "Ambos são O(n log n), MergeSort é mais simples",
      "MergeSort é O(n), pois divide ao meio",
    ],
    correta: 1,
    gabarito: {
      resposta: "MergeSort é O(n log n) pelo balanceamento; SelectionSort é O(n²) sem balanceamento",
      passos: [
        "SelectionSort: T(n)=T(n−1)+n−1 → divide em 1 e n−1 → sem balanceamento → O(n²)",
        "MergeSort: T(n)=2T(n/2)+n → divide em n/2 e n/2 → balanceado → O(n log n)",
        "Para n=10⁶: n²=10¹² ops vs n·log n ≈ 2×10⁷ ops",
        "O balanceamento é o fator decisivo para eficiência assintótica",
      ],
      conclusao: "Dividir sempre ao meio garante árvore de recursão com altura log n (não n). Isso transforma O(n²) em O(n log n).",
    },
  },
  {
    id: 11, tema: "Divisão e Conquista", cor: "#34d399", dificuldade: "Médio",
    enunciado: "Ordene com MergeSort. Qual é a sequência após a primeira rodada de merges (unindo pares individuais)?",
    formula: "S = [5, 3, 8, 1, 9, 2, 7, 4]",
    opcoes: [
      "[3, 5, 1, 8, 2, 9, 4, 7]",
      "[1, 3, 5, 8, 2, 4, 7, 9]",
      "[3, 5, 8, 1, 2, 9, 4, 7]",
      "[1, 2, 3, 4, 5, 7, 8, 9]",
    ],
    correta: 0,
    gabarito: {
      resposta: "[3, 5, 1, 8, 2, 9, 4, 7]",
      passos: [
        "Divisão completa: [5]|[3] | [8]|[1] | [9]|[2] | [7]|[4]",
        "merge([5],[3]) → [3,5]",
        "merge([8],[1]) → [1,8]",
        "merge([9],[2]) → [2,9]",
        "merge([7],[4]) → [4,7]",
        "Resultado: [3,5,1,8,2,9,4,7]",
      ],
      conclusao: "MergeSort divide tudo primeiro, depois faz merge de baixo para cima. Primeira rodada une apenas pares de 1 elemento.",
    },
  },
  {
    id: 12, tema: "Divisão e Conquista", cor: "#34d399", dificuldade: "Médio",
    enunciado: "Para MaxMin D&C com n=16 elementos, quantas comparações são realizadas?",
    formula: "T(n) = 2T(n/2) + 2,  T(2)=1  →  T(n) = (3/2)n − 2",
    opcoes: ["30", "15", "22", "20"],
    correta: 2,
    gabarito: {
      resposta: "22 comparações",
      passos: [
        "Fórmula: T(n) = (3/2)n − 2",
        "T(16) = (3/2)·16 − 2 = 24 − 2 = 22",
        "Método ingênuo: 2·(16−1) = 30 comparações",
        "D&C economiza 8 comparações (≈27% a menos)",
      ],
      conclusao: "A fórmula T(n)=(3/2)n−2 é provada por indução na aula. D&C é mais eficiente pois cada comparação elimina dois candidatos simultaneamente.",
    },
  },
  {
    id: 13, tema: "Divisão e Conquista", cor: "#34d399", dificuldade: "Difícil",
    enunciado: "Qual afirmação sobre o QuickSort é CORRETA?",
    formula: "",
    opcoes: [
      "QuickSort sempre tem complexidade O(n log n) no pior caso",
      "QuickSort divide em torno de um pivô; pior caso O(n²) quando pivô é sempre o menor/maior",
      "QuickSort é estável e usa O(1) de memória auxiliar",
      "QuickSort tem complexidade O(n) no caso médio",
    ],
    correta: 1,
    gabarito: {
      resposta: "QuickSort divide em torno de um pivô; pior caso O(n²) quando pivô é sempre o menor/maior",
      passos: [
        "QuickSort escolhe um pivô e particiona: elementos menores à esquerda, maiores à direita",
        "Caso médio (pivô divide bem): T(n) = 2T(n/2) + n → O(n log n)",
        "Pior caso (vetor ordenado, pivô=mínimo): T(n) = T(n−1) + n → O(n²)",
        "Não é estável (trocas mudam ordem relativa de iguais)",
        "Usa O(log n) de pilha de recursão (não O(1))",
      ],
      conclusao: "QuickSort é O(n log n) no caso médio mas O(n²) no pior. Na prática é muito rápido; escolha aleatória de pivô evita o pior caso.",
    },
  },

  // ── MÉTODO GULOSO (Q14–Q15) ───────────────
  {
    id: 14, tema: "Método Guloso", cor: "#fbbf24", dificuldade: "Fácil",
    enunciado: "Qual afirmação sobre o Método Guloso é CORRETA?",
    formula: "",
    opcoes: [
      "Sempre garante a solução ótima global",
      "Nunca garante solução ótima — apenas aproximada",
      "Faz escolhas localmente ótimas; não garante sempre o ótimo global",
      "É sempre mais lento que programação dinâmica",
    ],
    correta: 2,
    gabarito: {
      resposta: "Faz escolhas localmente ótimas; não garante sempre o ótimo global",
      passos: [
        "Definição: escolha ótima local em cada passo, esperando ótimo global",
        "Onde funciona: Huffman ✓, Kruskal ✓, Dijkstra ✓, Troco (moedas canônicas) ✓",
        "Onde não funciona: Mochila 0/1 ✗ (precisa Prog. Dinâmica)",
        "A alternativa A está errada: não é 'sempre ótimo'",
        "A alternativa B está errada: em muitos casos são exatamente ótimos",
      ],
      conclusao: "A essência do guloso: ótimo local ≠ ótimo global necessariamente. A prova de otimalidade é parte essencial de cada algoritmo guloso.",
    },
  },
  {
    id: 15, tema: "Método Guloso", cor: "#fbbf24", dificuldade: "Médio",
    enunciado: "Usando a estratégia gulosa do troco, qual é a sequência de moedas para pagar R$0,41 com moedas de 25, 10, 5 e 1 centavos?",
    formula: "Valor a pagar: 41 centavos",
    opcoes: [
      "1×25 + 1×10 + 1×5 + 1×1  (4 moedas)",
      "1×25 + 1×10 + 6×1  (8 moedas)",
      "4×10 + 1×1  (5 moedas)",
      "1×25 + 2×5 + 6×1  (9 moedas)",
    ],
    correta: 0,
    gabarito: {
      resposta: "1×25 + 1×10 + 1×5 + 1×1 (4 moedas)",
      passos: [
        "Estratégia: usar sempre a maior moeda ≤ troco restante",
        "41: usar 25 (maior ≤ 41) → restam 16",
        "16: usar 10 (maior ≤ 16) → restam 6",
        "6: usar 5 (maior ≤ 6) → restam 1",
        "1: usar 1 → restam 0",
        "Total: 4 moedas — solução ótima para moedas canônicas",
      ],
      conclusao: "Para sistemas de moedas canônicos (como o brasileiro), o guloso garante o ótimo. Para sistemas não-canônicos isso pode falhar.",
    },
  },

  // ── HUFFMAN (Q16–Q19) ─────────────────────
  {
    id: 16, tema: "Huffman", cor: "#f472b6", dificuldade: "Médio",
    enunciado: "Dado o alfabeto, qual é o custo total (bits) para 100 caracteres com distribuição proporcional usando Huffman?",
    formula: "A=50, B=25, C=15, D=10  (frequências %)",
    opcoes: ["300 bits", "175 bits", "200 bits", "150 bits"],
    correta: 1,
    gabarito: {
      resposta: "175 bits",
      passos: [
        "Construir Huffman: menores primeiro → D(10)+C(15)=CD(25)",
        "CD(25)+B(25)=BCD(50)",
        "BCD(50)+A(50)=raiz(100)",
        "Códigos: A=0 (1 bit), B=10 (2), C=110 (3), D=111 (3)",
        "Custo = 50×1 + 25×2 + 15×3 + 10×3 = 50+50+45+30 = 175",
        "Código fixo (2 bits): 100×2 = 200 bits",
      ],
      conclusao: "Huffman economiza 25 bits (12,5%). A=0 (mais frequente) recebe código de 1 bit — princípio central do algoritmo.",
    },
  },
  {
    id: 17, tema: "Huffman", cor: "#f472b6", dificuldade: "Médio",
    enunciado: "Decodifique a mensagem usando os códigos Huffman fornecidos:",
    formula: "Códigos: A=0  B=10  C=110  D=111   |   Mensagem: 0101110",
    opcoes: ["A B C A", "A B A D", "A B D", "A A B C"],
    correta: 0,
    gabarito: {
      resposta: "A B C A",
      passos: [
        "Bits: 0 1 0 1 1 1 0",
        "0 → A ✓   |   restante: 101110",
        "1 → ? | 10 → B ✓   |   restante: 1110",
        "1 → ? | 11 → ? | 110 → C ✓   |   restante: 0",
        "0 → A ✓   |   fim",
        "Mensagem: A B C A",
      ],
      conclusao: "Decodificação Huffman: lê bit a bit até formar código válido. Propriedade de prefixo garante sem ambiguidade.",
    },
  },
  {
    id: 18, tema: "Huffman", cor: "#f472b6", dificuldade: "Difícil",
    enunciado: "Ao construir a árvore de Huffman, qual é a ordem CORRETA de uniões para o conjunto abaixo?",
    formula: "A=6  B=2  C=9  D=11  E=4  F=5",
    opcoes: [
      "Une B+E → Une resultado+F → Une resultado+A ...",
      "Une B+E=6 → Une F+resultado=11 → Une A+resultado=17 → Une C+D=20 → Une 17+20=37",
      "Une D+C=20 primeiro por serem os maiores",
      "Une A+C=15 → Une B+D=13 → ...",
    ],
    correta: 1,
    gabarito: {
      resposta: "B(2)+E(4)=6  →  F(5)+(B+E)(6)=11  →  A(6)+(B+E)(6)=12  →  ...",
      passos: [
        "Frequências ordenadas: B=2, E=4, F=5, A=6, C=9, D=11",
        "Passo 1: une os dois menores B(2)+E(4) → nó BE=6",
        "Fila: F=5, A=6, BE=6, C=9, D=11",
        "Passo 2: une F(5)+A(6) → nó FA=11  (ou F+BE dependendo de desempate)",
        "Passo 3: une BE(6)+C(9) → nó BEC=15",
        "Passo 4: une FA(11)+D(11) → nó FAD=22",
        "Passo 5: une BEC(15)+FAD(22) → raiz=37",
      ],
      conclusao: "Sempre se une os dois de MENOR frequência. A ordem exata pode variar em desempates, mas o custo total da árvore ótima é o mesmo.",
    },
  },
  {
    id: 19, tema: "Huffman", cor: "#f472b6", dificuldade: "Médio",
    enunciado: "Qual das afirmações sobre a propriedade de prefixo de Huffman é CORRETA?",
    formula: "",
    opcoes: [
      "Todo código deve ter o mesmo comprimento",
      "Nenhum código pode ser prefixo de outro, garantindo decodificação única",
      "O código do caractere mais frequente sempre é '0'",
      "A árvore de Huffman deve ser balanceada (mesma altura em todos os ramos)",
    ],
    correta: 1,
    gabarito: {
      resposta: "Nenhum código pode ser prefixo de outro, garantindo decodificação única",
      passos: [
        "Propriedade de prefixo (free-prefix code): nenhum codeword é prefixo de outro",
        "Exemplo violando: se A=0 e B=01, ao ver '01' não sabemos se é B ou A+?",
        "Em Huffman, todos os símbolos ficam nas FOLHAS da árvore",
        "Folha = nenhum descendente → nenhum código é prefixo de outro ✓",
        "Isso garante decodificação única e sem ambiguidade",
      ],
      conclusao: "A estrutura de árvore binária com símbolos apenas nas folhas é exatamente o que garante a propriedade de prefixo e a decodificação única.",
    },
  },

  // ── KRUSKAL / AGM (Q20–Q23) ──────────────
  {
    id: 20, tema: "Kruskal / AGM", cor: "#f87171", dificuldade: "Médio",
    enunciado: "Aplicando Kruskal ao grafo abaixo, qual é o custo total da AGM?",
    formula: "(A,B)=4  (A,C)=2  (B,C)=5  (B,D)=10  (C,D)=3  (D,E)=7  (C,E)=8",
    opcoes: ["22", "16", "19", "14"],
    correta: 1,
    gabarito: {
      resposta: "16",
      passos: [
        "Ordenar: (A,C)=2, (C,D)=3, (A,B)=4, (B,C)=5, (D,E)=7, (C,E)=8, (B,D)=10",
        "Add (A,C)=2: {A,C} → T=2",
        "Add (C,D)=3: {A,C,D} → T=5",
        "Add (A,B)=4: {A,B,C,D} → T=9",
        "Skip (B,C)=5: B e C já conectados → ciclo!",
        "Add (D,E)=7: {A,B,C,D,E} → T=16 — todos conectados (4 arestas = n−1) ✓",
      ],
      conclusao: "Kruskal adiciona sempre a menor aresta sem criar ciclo. (B,C)=5 foi descartada pois B e C já estavam no mesmo componente.",
    },
  },
  {
    id: 21, tema: "Kruskal / AGM", cor: "#f87171", dificuldade: "Difícil",
    enunciado: "Qual é a complexidade do Kruskal e qual estrutura de dados é ideal?",
    formula: "Grafo G(V,E): |V|=n vértices, |E|=m arestas",
    opcoes: [
      "O(m²) — lista de adjacência",
      "O(m log n) — fila de prioridade + Union-Find",
      "O(n²) — matriz de adjacência",
      "O(m·n) — busca linear nas arestas",
    ],
    correta: 1,
    gabarito: {
      resposta: "O(m log n) — fila de prioridade + Union-Find",
      passos: [
        "Ordenar m arestas: O(m log m) = O(m log n) pois m ≤ n²",
        "m iterações, cada uma com operação Union-Find",
        "Union-Find com compressão: O(α(n)) ≈ O(1) por operação",
        "Total Union-Find: O(m · α(n)) ≈ O(m)",
        "Dominante: ordenação → complexidade total O(m log n)",
      ],
      conclusao: "Union-Find é fundamental. Sem ele, verificar ciclos seria O(n) por aresta → O(m·n) total. Kruskal é ótimo em grafos esparsos.",
    },
  },
  {
    id: 22, tema: "Kruskal / AGM", cor: "#f87171", dificuldade: "Médio",
    enunciado: "Uma AGM de um grafo com 8 vértices possui quantas arestas?",
    formula: "Grafo G com n=8 vértices, conexo e não-direcionado",
    opcoes: ["8", "7", "6", "Depende do grafo"],
    correta: 1,
    gabarito: {
      resposta: "7 arestas",
      passos: [
        "Uma árvore com n vértices sempre tem n−1 arestas",
        "A AGM é uma árvore (acíclica e conecta todos os vértices)",
        "Para n=8: número de arestas = 8−1 = 7",
        "Isso vale para qualquer grafo conexo com 8 vértices",
      ],
      conclusao: "Propriedade fundamental: toda árvore com n vértices tem exatamente n−1 arestas. A AGM, sendo uma árvore geradora, segue essa regra.",
    },
  },
  {
    id: 23, tema: "Kruskal / AGM", cor: "#f87171", dificuldade: "Difícil",
    enunciado: "Qual afirmação sobre a AGM é CORRETA?",
    formula: "",
    opcoes: [
      "A AGM de um grafo é sempre única",
      "A AGM pode ser encontrada somente pelo algoritmo de Kruskal",
      "Um grafo pode ter múltiplas AGMs com o mesmo custo total",
      "A AGM sempre inclui a aresta de maior peso do grafo",
    ],
    correta: 2,
    gabarito: {
      resposta: "Um grafo pode ter múltiplas AGMs com o mesmo custo total",
      passos: [
        "Exemplo do slide: grafo com AGM de custo 13 — pode-se substituir aresta (1,4) por (5,4) e obter outra AGM também de custo 13",
        "Alternativa A errada: AGM pode não ser única (mas o custo mínimo é único)",
        "Alternativa B errada: Prim também encontra AGM; há outros algoritmos",
        "Alternativa D errada: AGM minimiza custo, inclui arestas de menor peso (não maior)",
      ],
      conclusao: "O custo mínimo de uma AGM é único, mas podem existir múltiplas árvores geradoras com esse mesmo custo. Isso ocorre quando há empates de peso entre arestas.",
    },
  },

  // ── QUESTÕES INTEGRADAS (Q24–Q25) ─────────
  {
    id: 24, tema: "Integrada", cor: "#a78bfa", dificuldade: "Difícil",
    enunciado: "Relacione cada algoritmo à sua complexidade e ao paradigma correto:",
    formula: "MergeSort / Huffman / Kruskal / Busca Binária",
    opcoes: [
      "MergeSort=O(n²) · Huffman=O(n) · Kruskal=O(m log n) · Busca Binária=O(log n)",
      "MergeSort=O(n log n) · Huffman=O(n log n) · Kruskal=O(m log n) · Busca Binária=O(log n)",
      "MergeSort=O(n log n) · Huffman=O(n²) · Kruskal=O(n²) · Busca Binária=O(n)",
      "MergeSort=O(n log n) · Huffman=O(n log n) · Kruskal=O(m²) · Busca Binária=O(log n)",
    ],
    correta: 1,
    gabarito: {
      resposta: "MergeSort=O(n log n) · Huffman=O(n log n) · Kruskal=O(m log n) · Busca Binária=O(log n)",
      passos: [
        "MergeSort: D&C, T(n)=2T(n/2)+n → Caso 2 Mestre → O(n log n)",
        "Huffman: Guloso, n−1 uniões com min-heap → O(n log n)",
        "Kruskal: Guloso, ordenação dominante + Union-Find → O(m log n)",
        "Busca Binária: D&C, T(n)=T(n/2)+1 → Caso 2 Mestre → O(log n)",
        "Paradigmas: MergeSort=D&C · Huffman=Guloso · Kruskal=Guloso · B.Binária=D&C",
      ],
      conclusao: "Memorizar paradigmas e complexidades juntos: D&C frequentemente gera log n ou n log n. Guloso em grafos: O(m log n) pela ordenação de arestas.",
    },
  },
  {
    id: 25, tema: "Integrada", cor: "#a78bfa", dificuldade: "Difícil",
    enunciado: "Um sistema de IA divide um problema em 4 subproblemas de tamanho n/2 e combina em O(n²). Qual a complexidade e qual caso do Mestre se aplica?",
    formula: "T(n) = 4T(n/2) + n²",
    opcoes: [
      "O(n² log n) — Caso 2",
      "O(n²) — Caso 1",
      "O(n³) — Caso 3",
      "O(n² log n) — Caso 3",
    ],
    correta: 0,
    gabarito: {
      resposta: "O(n² log n) — Caso 2",
      passos: [
        "a=4, b=2, f(n)=n²",
        "n^log₂4 = n^2 = n²",
        "f(n) = n² = Θ(n^log_b a) = Θ(n²) → funções assintoticamente iguais",
        "Caso 2 → T(n) = Θ(n² · log n)",
        "Este é o exercício 6 da aula 20 (2T(n/4)+n² → Caso 3); aqui é diferente: 4T(n/2)",
      ],
      conclusao: "Cuidado: 4T(n/2) → n^log₂4=n². Como f(n)=n² também, é Caso 2 → multiplica por log n. Não confundir com Caso 3 (exigiria f(n) polinomialmente MAIOR).",
    },
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const fmt = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((p, i) =>
    i % 2 === 1
      ? <strong key={i} style={{ color: "#f1f5f9", fontWeight: 700 }}>{p}</strong>
      : p
  );
};

const difCor = { Fácil: "#34d399", Médio: "#fbbf24", Difícil: "#f87171" };
const TEMAS_Q = ["Todos", "Expansão", "Método Mestre", "Divisão e Conquista", "Método Guloso", "Huffman", "Kruskal / AGM", "Integrada"];
const DIFS   = ["Todas", "Fácil", "Médio", "Difícil"];

// ─────────────────────────────────────────────
// COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────
export default function App() {
  const [aba, setAba] = useState("resumo"); // resumo | exercicios
  // resumo
  const [topicoId, setTopicoId] = useState(null);
  const [pesquisa, setPesquisa] = useState("");
  // exercícios
  const [respostas, setRespostas] = useState({});
  const [gabaritos, setGabaritos] = useState({});
  const [temaSel, setTemaSel] = useState("Todos");
  const [difSel, setDifSel]   = useState("Todas");

  const topicoAtivo   = topics.find(t => t.id === topicoId);
  const topicsFilt    = topics.filter(t =>
    t.titulo.toLowerCase().includes(pesquisa.toLowerCase()) ||
    t.aula.toLowerCase().includes(pesquisa.toLowerCase())
  );
  const questoesFilt  = questoes.filter(q =>
    (temaSel === "Todos" || q.tema === temaSel) &&
    (difSel  === "Todas" || q.dificuldade === difSel)
  );
  const respondidas   = Object.keys(gabaritos).length;
  const acertos       = questoes.filter(q => gabaritos[q.id] && respostas[q.id] === q.correta).length;

  const responder  = (qid, idx) => { if (!gabaritos[qid]) setRespostas(r => ({...r, [qid]: idx})); };
  const confirmar  = (qid)      => { if (respostas[qid] !== undefined) setGabaritos(g => ({...g, [qid]: true})); };
  const revelarTudo = () => {
    const nr = {...respostas}; const ng = {...gabaritos};
    questoesFilt.forEach(q => { if (!ng[q.id]) { if (nr[q.id] === undefined) nr[q.id]=-1; ng[q.id]=true; } });
    setRespostas(nr); setGabaritos(ng);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#090912", color:"#c8d3e0", fontFamily:"'Georgia', serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"#0d0d18", borderBottom:"1px solid #1a1a2e", padding:"24px 20px 0", textAlign:"center" }}>
        <div style={{ fontSize:11, letterSpacing:4, color:"#818cf8", textTransform:"uppercase", marginBottom:4 }}>
          Projeto e Análise de Algoritmos
        </div>
        <h1 style={{ fontSize:"clamp(18px,4vw,30px)", fontWeight:900, color:"#f1f5f9", margin:"0 0 4px" }}>
          📚 Guia Completo para a Prova
        </h1>
        <p style={{ fontSize:12, color:"#475569", margin:"0 0 16px" }}>
          Aulas 16–27 · Prof. Francisco José de Araújo
        </p>

        {/* ABAS */}
        <div style={{ display:"flex", justifyContent:"center", gap:0 }}>
          {[["resumo","📖 Resumo"], ["exercicios","✏️ Exercícios (25)"]].map(([id, label]) => (
            <button key={id} onClick={() => setAba(id)} style={{
              padding:"10px 28px", background: aba===id ? "#818cf8" : "transparent",
              border:"none", borderBottom: aba===id ? "2px solid #818cf8" : "2px solid transparent",
              color: aba===id ? "#fff" : "#64748b", fontSize:13, fontWeight:700, cursor:"pointer",
              transition:"all 0.15s", borderRadius: aba===id ? "8px 8px 0 0" : "0",
            }}>{label}</button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          ABA: RESUMO
      ══════════════════════════════════════ */}
      {aba === "resumo" && (
        <div style={{ maxWidth:900, margin:"0 auto", padding:"24px 16px" }}>
          {!topicoId && (
            <>
              <input
                type="text" placeholder="🔍 Buscar tópico..."
                value={pesquisa} onChange={e => setPesquisa(e.target.value)}
                style={{ width:"100%", padding:"10px 16px", background:"#1a1a2e", border:"1px solid #2d2d4a",
                  borderRadius:8, color:"#f1f5f9", fontSize:14, outline:"none", boxSizing:"border-box", marginBottom:20 }}
              />

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14, marginBottom:28 }}>
                {topicsFilt.map(t => (
                  <button key={t.id} onClick={() => setTopicoId(t.id)} style={{
                    background:"#10101a", border:`1px solid ${t.cor}33`, borderLeft:`4px solid ${t.cor}`,
                    borderRadius:10, padding:"18px", cursor:"pointer", textAlign:"left", color:"inherit",
                    transition:"all 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background="#18182a"; e.currentTarget.style.transform="translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background="#10101a"; e.currentTarget.style.transform="translateY(0)"; }}
                  >
                    <div style={{ fontSize:26, marginBottom:6 }}>{t.emoji}</div>
                    <div style={{ fontSize:10, color:t.cor, letterSpacing:2, marginBottom:3, textTransform:"uppercase" }}>{t.aula}</div>
                    <div style={{ fontSize:15, fontWeight:700, color:"#f1f5f9", marginBottom:6 }}>{t.titulo}</div>
                    <div style={{ fontSize:12, color:"#475569" }}>{t.secoes.length} seções · clique para expandir →</div>
                  </button>
                ))}
              </div>

              {/* Mapa geral */}
              <div style={{ background:"#10101a", border:"1px solid #1a1a2e", borderRadius:10, padding:20 }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#f1f5f9", marginBottom:14 }}>🗺️ Mapa Geral da Matéria</div>
                {[
                  { label:"Recorrências",       cor:"#818cf8", items:["Árvore de Recursão (Aula 16)","Expansão (Aula 16)","Método Mestre (Aula 20)"] },
                  { label:"Dividir e Conquistar",cor:"#34d399", items:["Balanceamento (Aula 22)","MergeSort (Aula 22)","Máx/Mín Simultâneos (Aula 22)"] },
                  { label:"Método Guloso",       cor:"#fbbf24", items:["Conceitos (Aula 24)","Huffman (Aulas 24–26)","Kruskal / AGM (Aula 27)"] },
                ].map(g => (
                  <div key={g.label} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                    <div style={{ minWidth:130, fontSize:11, fontWeight:700, color:g.cor, paddingTop:3, textTransform:"uppercase", letterSpacing:1 }}>{g.label}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {g.items.map(item => (
                        <span key={item} style={{ background:`${g.cor}15`, border:`1px solid ${g.cor}30`, borderRadius:4, padding:"3px 8px", fontSize:11, color:"#94a3b8" }}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {topicoAtivo && (
            <div>
              <button onClick={() => setTopicoId(null)} style={{ background:"none", border:"1px solid #2d2d4a", borderRadius:6, padding:"8px 16px", color:"#94a3b8", cursor:"pointer", fontSize:13, marginBottom:20 }}>
                ← Voltar aos tópicos
              </button>
              <div style={{ borderLeft:`4px solid ${topicoAtivo.cor}`, paddingLeft:16, marginBottom:22 }}>
                <div style={{ fontSize:10, color:topicoAtivo.cor, letterSpacing:3, textTransform:"uppercase" }}>{topicoAtivo.aula}</div>
                <h2 style={{ fontSize:"clamp(18px,3.5vw,26px)", color:"#f1f5f9", margin:"4px 0 0", fontWeight:900 }}>
                  {topicoAtivo.emoji} {topicoAtivo.titulo}
                </h2>
              </div>

              {topicoAtivo.secoes.map((sec, i) => (
                <div key={i} style={{ background:"#10101a", border:"1px solid #1a1a2e", borderRadius:10, padding:18, marginBottom:14 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:topicoAtivo.cor, textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>{sec.subtitulo}</div>
                  <ul style={{ margin:0, padding:"0 0 0 16px" }}>
                    {sec.conteudo.map((linha, j) => (
                      <li key={j} style={{ fontSize:13, lineHeight:1.75, color:"#94a3b8", marginBottom:5 }}>{fmt(linha)}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div style={{ background:`${topicoAtivo.cor}0d`, border:`1px solid ${topicoAtivo.cor}33`, borderRadius:10, padding:16, marginTop:4 }}>
                <div style={{ fontSize:12, color:topicoAtivo.cor, fontWeight:700, marginBottom:6 }}>⚡ Dica para a Prova</div>
                <div style={{ fontSize:13, color:"#94a3b8", lineHeight:1.65 }}>{fmt(topicoAtivo.dica)}</div>
              </div>

              <div style={{ display:"flex", gap:8, marginTop:20, flexWrap:"wrap" }}>
                {topics.map(t => (
                  <button key={t.id} onClick={() => setTopicoId(t.id)} style={{
                    background: t.id===topicoId ? `${t.cor}20` : "#10101a",
                    border:`1px solid ${t.id===topicoId ? t.cor : "#2d2d4a"}`,
                    borderRadius:6, padding:"5px 10px", cursor:"pointer", fontSize:11,
                    color: t.id===topicoId ? t.cor : "#64748b",
                  }}>
                    {t.emoji} {t.aula}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          ABA: EXERCÍCIOS
      ══════════════════════════════════════ */}
      {aba === "exercicios" && (
        <div style={{ maxWidth:880, margin:"0 auto", padding:"24px 16px" }}>

          {/* Placar */}
          {respondidas > 0 && (
            <div style={{ display:"flex", justifyContent:"center", gap:0, marginBottom:20 }}>
              <div style={{ display:"inline-flex", gap:20, background:"#10101a", border:"1px solid #1a1a2e", borderRadius:10, padding:"12px 28px" }}>
                {[
                  { v: acertos,     l: "Acertos",    c: "#34d399" },
                  { v: respondidas, l: "Feitas",      c: "#f1f5f9" },
                  { v: `${respondidas>0?Math.round(acertos/respondidas*100):0}%`, l: "Aproveit.", c: "#818cf8" },
                ].map(({v,l,c},i,a) => (
                  <div key={l} style={{ textAlign:"center", paddingRight: i<a.length-1?20:0, borderRight: i<a.length-1?"1px solid #1a1a2e":undefined }}>
                    <div style={{ fontSize:24, fontWeight:900, color:c }}>{v}</div>
                    <div style={{ fontSize:10, color:"#475569", textTransform:"uppercase", letterSpacing:1 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Filtros */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:22 }}>
            {TEMAS_Q.map(t => (
              <button key={t} onClick={() => setTemaSel(t)} style={{
                padding:"4px 11px", background: temaSel===t?"#818cf8":"#10101a",
                border:`1px solid ${temaSel===t?"#818cf8":"#2d2d4a"}`, borderRadius:20,
                color: temaSel===t?"#fff":"#64748b", fontSize:11, cursor:"pointer",
              }}>{t}</button>
            ))}
            <div style={{ width:1, background:"#2d2d4a", margin:"0 4px" }} />
            {DIFS.map(d => (
              <button key={d} onClick={() => setDifSel(d)} style={{
                padding:"4px 11px", background: difSel===d?"#2d3748":"#10101a",
                border:`1px solid ${difSel===d?"#64748b":"#2d2d4a"}`, borderRadius:20,
                color: difSel===d?"#f1f5f9":"#64748b", fontSize:11, cursor:"pointer",
              }}>{d}</button>
            ))}
          </div>

          {/* Lista de questões */}
          {questoesFilt.map(q => {
            const respondeu = respostas[q.id] !== undefined;
            const confirmou = gabaritos[q.id];
            const acertou   = confirmou && respostas[q.id] === q.correta;

            return (
              <div key={q.id} style={{
                background:"#0d0d18", borderRadius:12, padding:22, marginBottom:18,
                border:`1px solid ${confirmou ? (acertou?"#34d39930":"#f8717130") : "#1a1a2e"}`,
                borderLeft:`4px solid ${confirmou?(acertou?"#34d399":"#f87171"):q.cor}`,
              }}>
                {/* Cabeçalho */}
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10, flexWrap:"wrap", gap:6 }}>
                  <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#475569" }}>Q{q.id}</span>
                    <span style={{ fontSize:10, padding:"2px 8px", background:`${q.cor}18`, border:`1px solid ${q.cor}40`, borderRadius:4, color:q.cor }}>{q.tema}</span>
                    <span style={{ fontSize:10, padding:"2px 8px", background:`${difCor[q.dificuldade]}15`, border:`1px solid ${difCor[q.dificuldade]}30`, borderRadius:4, color:difCor[q.dificuldade] }}>{q.dificuldade}</span>
                  </div>
                  {confirmou && <span style={{ fontSize:13, fontWeight:700, color:acertou?"#34d399":"#f87171" }}>{acertou?"✓ Correto!":"✗ Incorreto"}</span>}
                </div>

                <p style={{ fontSize:13, lineHeight:1.7, color:"#94a3b8", margin:"0 0 8px" }}>{q.enunciado}</p>
                {q.formula && (
                  <div style={{ background:"#13132a", border:"1px solid #1e1e3a", borderRadius:7, padding:"9px 14px", fontFamily:"monospace", fontSize:12, color:"#818cf8", marginBottom:14 }}>
                    {q.formula}
                  </div>
                )}

                {/* Opções */}
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:14 }}>
                  {q.opcoes.map((op, i) => {
                    const sel  = respostas[q.id] === i;
                    const cor_ = q.correta === i;
                    let bg="#13132a", brd="#1e1e3a", clr="#94a3b8";
                    if (confirmou) {
                      if (cor_)      { bg="#34d39912"; brd="#34d399"; clr="#34d399"; }
                      else if (sel)  { bg="#f8717112"; brd="#f87171"; clr="#f87171"; }
                    } else if (sel)  { bg="#818cf812"; brd="#818cf8"; clr="#a5b4fc"; }

                    return (
                      <button key={i} onClick={() => responder(q.id, i)} style={{
                        background:bg, border:`1px solid ${brd}`, borderRadius:7,
                        padding:"9px 13px", textAlign:"left", cursor:confirmou?"default":"pointer",
                        color:clr, fontSize:12, lineHeight:1.5, display:"flex", gap:8, transition:"all 0.12s",
                      }}>
                        <span style={{ fontWeight:700, minWidth:18 }}>{String.fromCharCode(65+i)})</span>
                        <span>{op}</span>
                      </button>
                    );
                  })}
                </div>

                {!confirmou && (
                  <button onClick={() => confirmar(q.id)} disabled={!respondeu} style={{
                    background: respondeu?"#818cf8":"#1a1a2e", border:"none", borderRadius:7,
                    padding:"9px 20px", color: respondeu?"#fff":"#475569",
                    fontSize:12, cursor:respondeu?"pointer":"not-allowed", fontWeight:700,
                  }}>
                    Confirmar Resposta
                  </button>
                )}

                {/* Gabarito */}
                {confirmou && (
                  <div style={{ marginTop:14, background:"#0a0a14", border:"1px solid #1a1a2e", borderRadius:9, padding:16 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:"#818cf8", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>📖 Gabarito Comentado</div>
                    <div style={{ fontSize:12, fontWeight:700, color:"#34d399", marginBottom:10 }}>✓ {q.gabarito.resposta}</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
                      {q.gabarito.passos.map((p, i) => (
                        <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:"#64748b", lineHeight:1.6 }}>
                          <span style={{ color:"#2d3748", minWidth:14 }}>{i+1}.</span>
                          <span style={{ fontFamily: p.includes("→")||p.includes("=")||p.includes("T(")?"monospace":"inherit" }}>{p}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background:"#818cf80d", border:"1px solid #818cf825", borderRadius:7, padding:"9px 13px", fontSize:12, color:"#94a3b8", lineHeight:1.6 }}>
                      💡 <strong style={{ color:"#a5b4fc" }}>Conclusão:</strong> {q.gabarito.conclusao}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {questoesFilt.length > 0 && (
            <div style={{ textAlign:"center", paddingTop:4, paddingBottom:32 }}>
              <button onClick={revelarTudo} style={{ background:"none", border:"1px solid #2d2d4a", borderRadius:7, padding:"9px 22px", color:"#64748b", fontSize:12, cursor:"pointer" }}>
                Revelar todos os gabaritos
              </button>
            </div>
          )}
          {questoesFilt.length === 0 && (
            <div style={{ textAlign:"center", color:"#475569", padding:48 }}>Nenhuma questão com esses filtros.</div>
          )}
        </div>
      )}
    </div>
  );
}
