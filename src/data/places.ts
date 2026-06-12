// ============================================================
//  CONFIGURE SEUS LUGARES AQUI
//  - name: nome do lugar
//  - emoji: emoji representativo
//  - secretChar: o caractere secreto revelado ao completar o puzzle
//  - imagePath: caminho da foto em /public/photos/
//  - description: descrição curta do lugar
//  - memory: memória especial do lugar
//
//  A senha final é formada pelos secretChar de cada lugar na ordem.
//  Ex: se os 4 lugares têm secretChar: 'A','M','O','R' → senha = "AMOR"
//
//  O SPOTIFY_LINK abaixo é revelado quando a senha estiver correta.
// ============================================================

import { Place } from '../types'

export const SPOTIFY_LINK = 'https://open.spotify.com/playlist/6c8B43wi5qkRWHCWN9wy45?si=ed6b7aad58dd4b41'

export const places: Place[] = [
  {
    id: 'lugar1',
    name: 'Belo',
    emoji: '🌆',
    secretChar: 'F',
    imagePath: '/photos/lugar1.jpg',
    description: '"você namora? bla bla bla"',
    memory: 'Onde tudo começou ❤️',
  },
  {
    id: 'lugar2',
    name: 'Div',
    emoji: '🌙',
    secretChar: 'O',
    imagePath: '/photos/lugar2.jpg',
    description: 'Nossa Primeira mini viagem juntos',
    memory: 'Pegar um cookie de café aqui',
  },
  {
    id: 'lugar3',
    name: 'Tiradentes',
    emoji: '⛪',
    secretChar: 'F',
    imagePath: '/photos/lugar3.jpg',
    description: 'Mais um momentinho especial com meu amor',
    memory: 'Ela a mais bebuxa com seus choppussys de vinhussys',
  },
  {
    id: 'lugar4',
    name: 'Paris',
    emoji: '🗼',
    secretChar: 'A',
    imagePath: '/photos/lugar4.jpg',
    description: 'Minha primeira viagem pra europa e com meu amor',
    memory: 'Sou a pessoa mais sortuda por ter minha francesa',
  },
  {
    id: 'lugar5',
    name: 'Praga',
    emoji: '🍻',
    secretChar: 'L',
    imagePath: '/photos/lugar5.jpg',
    description: 'Nosso primeiro amor em terras europeias 😋',
    memory: 'Cada cerveja ficou mais gostosa só por você está lá comigo amor',
  },
  {
    id: 'lugar6',
    name: 'Vienna',
    emoji: '🏰',
    secretChar: 'E',
    imagePath: '/photos/lugar6.jpg',
    description: 'Passada mais rapidinha mas eterno no meu coração',
    memory: 'Nós vivendo o before sunshine ( espero que eles também ficaram juntos para sempre, porque nós vamos)',
  },
  {
    id: 'lugar7',
    name: 'Roma',
    emoji: '🍕',
    secretChar: 'T',
    imagePath: '/photos/lugar7.jpg',
    description: 'Ouvir sobre abaccatios e cascas nunca foi tão especial para mim',
    memory: 'the egyptians believed the most significant thing you could do in your life was die',
  },
  {
    id: 'lugar8',
    name: 'Veneza',
    emoji: '🛶',
    secretChar: 'Y',
    imagePath: '/photos/lugar8.jpg',
    description: 'Cidade era linda então nada mais justo de ir junto da mulher mais linda do mundo',
    memory: 'Nossa última cidade juntos naquele momento mais o início de um novo momento onde vamos viajar ainda mais meu amor',
  }
]

// A senha correta é a concatenação de todos os secretChar em ordem
export const SECRET_PASSWORD = places.map(p => p.secretChar).join('')
