# Proposta comercial · SP Engenharia & Construção

Página estática da proposta da SF Creative para a SP Engenharia & Construção. HTML, CSS e JS puros, sem build.

## Publicar na Vercel
1. Vercel → **Add New → Project** → importar `avixagency/proposta-sp-engenharia`.
2. Framework Preset: **Other**. Sem comando de build, Output Directory vazio.
3. Deploy. Para um subdomínio (ex.: `sp.schneiderfilms.com`): **Settings → Domains**.

A página não é indexada pelo Google (`noindex` no HTML e no `vercel.json`), mas quem tiver o link consegue abrir.

## Ajustes rápidos (`app.js`, topo do arquivo)
| Campo | O que faz |
|---|---|
| `whatsapp` | Número exibido no fechamento (só números, com 55 + DDD) |
| `validade` | Ex.: `'30/11/2026'`. Vazio esconde a linha |
| `particulas`, `cursorPersonalizado`, `granulacao` | Liga/desliga efeitos |

## Valores
Os preços estão escritos direto no `index.html` (seções **Planos** e **Comparativo**). Se mudar um valor, procure por ele no arquivo e troque em todos os lugares: 1.800, 3.000, 500, 2.300, 3.500, 1.500 (por diária), 600 (economia).

## Estrutura
```
index.html      página
app.js          animações, partículas, cursor, WhatsApp/validade
assets/         logos (SF, SP e clientes) e favicon
vercel.json     noindex + cache dos assets
```
