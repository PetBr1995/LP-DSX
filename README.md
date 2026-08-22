# LP DSX — site do DSX Summit

Site de múltiplas páginas do **DSX Summit**, construído em **React + Vite**: institucional, páginas de venda, fluxo de checkout, área de patrocinadores, palestrantes e calendário do evento. Projeto real, em produção, com 450+ commits.

> 🌎 Multi-page marketing site for the DSX Summit event, built with React + Vite: landing pages, sales pages, checkout flow, sponsor and speaker areas.

---

## Stack

| Camada | Tecnologias |
| --- | --- |
| Front-end | React 18, Vite, JavaScript |
| Estilo | CSS modular + design system próprio |
| Qualidade | ESLint, auditorias Lighthouse |

---

## O que tem dentro

- **Design system próprio** (`src/design-system/`) — tokens e componentes reaproveitados nas 20+ páginas, para manter consistência visual sem repetir código.
- **Arquitetura por features** (`src/features/`) — cada área do site (patrocinadores, palestrantes, checkout) fica isolada com seus próprios componentes.
- **Hooks e utilitários próprios** (`src/hooks/`, `src/utils/`, `src/lib/`) — lógica compartilhada extraída da camada de UI.
- **Conteúdo separado do layout** (`src/data/`) — textos, listas de palestrantes e dados do evento vivem fora dos componentes, o que permite atualizar o site sem mexer em JSX.

## Páginas principais

| Página | Função |
| --- | --- |
| `Home` | Landing principal do evento |
| `Vendas` / `NewVendas` | Páginas de venda de ingressos |
| `PreCheckout` / `Checkout` / `Agradecimento` | Fluxo completo de compra |
| `Patrocinadores` | Área comercial: hero, big numbers, FAQ e formulário |
| `Palestrantes` | Grade de palestrantes do evento |
| `Calendario` | Programação por dia |
| `GrupoVip` / `PassaporteGrupo` | Ofertas segmentadas |

---

## Performance

O repositório versiona relatórios do Lighthouse (`.lighthouse-checkout.json`, `.lighthouse-negocios.json`) usados para acompanhar o desempenho das páginas mais críticas — a de checkout e a de negócios — ao longo das iterações do site.

---

## Rodando localmente

Pré-requisito: Node.js 18+.

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # build de produção
npm run preview  # serve o build local
npm run lint     # análise estática
```

---

## Próximos passos

- [ ] Publicar deploy público e linkar aqui
- [ ] Mover os assets pesados de `public/` para um CDN e reduzir o tamanho do repositório
- [ ] Documentar os tokens do design system
