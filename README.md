# 💕 Nossa História — Guia de Configuração

Projeto presente para sua namorada! Um app React com quebra-cabeças de lugares especiais que revelam letras secretas, e ao completar todos, a playlist do Spotify é revelada.

## ⚡ Instalação

```bash
npm install
npm run dev
```

---

## 🗺️ Como personalizar os lugares

Edite o arquivo **`src/data/places.ts`**

```ts
export const places: Place[] = [
  {
    id: 'lugar1',
    name: 'Shopping Recife',      // ← Nome do lugar
    emoji: '🛍️',                  // ← Emoji representativo
    secretChar: 'A',              // ← LETRA SECRETA (forma a senha)
    imagePath: '/photos/recife.jpg', // ← Foto (coloque em /public/photos/)
    description: 'Onde tudo começou...', // ← Texto no topo da página
    memory: 'Aqui foi nossa primeira saída ❤️', // ← Revelado ao completar o puzzle
  },
  // ... outros lugares
]
```

### 🔑 Como funciona a senha

A senha final é a **concatenação de todos os `secretChar` em ordem**.

Exemplo com 4 lugares:
- Lugar 1: `secretChar: 'A'`
- Lugar 2: `secretChar: 'M'`
- Lugar 3: `secretChar: 'O'`
- Lugar 4: `secretChar: 'R'`
→ Senha = **`AMOR`**

Sua namorada precisa completar os 4 quebra-cabeças, anotar cada letra, e digitar `AMOR` nos campos abaixo de cada botão.

---

## 🎵 Link do Spotify

No mesmo arquivo `src/data/places.ts`, mude:

```ts
export const SPOTIFY_LINK = 'https://open.spotify.com/playlist/SEU_LINK_AQUI'
```

---

## 📷 Adicionando as fotos

1. Crie a pasta **`public/photos/`**
2. Coloque as fotos lá (JPG ou PNG)
3. Referencie em `imagePath` com `/photos/nome-do-arquivo.jpg`

**Exemplo:**
- Arquivo: `public/photos/shopping.jpg`
- `imagePath: '/photos/shopping.jpg'`

> Se a foto não existir, o quebra-cabeça mostra números no lugar das peças (ainda funciona!).

---

## 🎮 Como o quebra-cabeça funciona

- A imagem é dividida em um grid 3×3 (8 peças + 1 espaço vazio)
- Clique nas peças adjacentes ao espaço vazio para mover
- **Segure "Ver foto"** para espiar a imagem original
- Ao montar a imagem corretamente → aparece a memória e a **letra secreta**
- Na página principal, digitando a letra correta no campo do lugar → fica verde ✓
- Ao acertar **todos os lugares** → 🎉 confetti + Playlist do Spotify revelada!

---

## 📁 Estrutura do projeto

```
nossa-historia/
├── public/
│   ├── heart.svg
│   └── photos/          ← COLOQUE SUAS FOTOS AQUI
│       ├── lugar1.jpg
│       └── lugar2.jpg
├── src/
│   ├── components/
│   │   ├── FloatingHearts.tsx   # corações flutuando no fundo
│   │   ├── PlaceCard.tsx        # card de cada lugar
│   │   └── SpotifyReveal.tsx    # revelação do Spotify
│   ├── data/
│   │   └── places.ts            # ← CONFIGURE AQUI
│   ├── pages/
│   │   ├── HomePage.tsx         # página principal
│   │   └── PuzzlePage.tsx       # página do quebra-cabeça
│   ├── types.ts
│   ├── App.tsx
│   └── App.css                  # tema pastel global
└── package.json
```

---

## 💡 Dicas

- Use **letras maiúsculas** nos `secretChar` (o app normaliza automaticamente)
- Você pode ter **quantos lugares quiser** — o grid se adapta automaticamente
- As fotos ficam salvas no browser (`localStorage`) — ela pode sair e voltar
- A senha pode ser **qualquer palavra** — não precisa ser "AMOR"!
