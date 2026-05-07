import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAA — Guia Completo para a Prova",
  description:
    "Resumo e exercícios de Projeto e Análise de Algoritmos — Aulas 16 a 27. Árvore de Recursão, Método Mestre, Divisão e Conquista, Huffman, Kruskal.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
