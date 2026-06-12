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

export const SPOTIFY_LINK = 'https://open.spotify.com/playlist/SEU_LINK_AQUI'

export const places: Place[] = [
  {
    id: 'lugar1',
    name: 'Lugar 1',
    emoji: '🌸',
    secretChar: 'A',
    imagePath: '/photos/lugar1.jpg',
    description: 'Um lugar que guarda nossa história...',
    memory: 'Aqui foi onde tudo começou ❤️',
  },
  {
    id: 'lugar2',
    name: 'Lugar 2',
    emoji: '🌙',
    secretChar: 'M',
    imagePath: '/photos/lugar2.jpg',
    description: 'Noites que nunca vou esquecer...',
    memory: 'Cada momento aqui foi mágico 🌙',
  },
  {
    id: 'lugar3',
    name: 'Lugar 3',
    emoji: '🌊',
    secretChar: 'O',
    imagePath: '/photos/lugar3.jpg',
    description: 'Onde o tempo parecia parar...',
    memory: 'Só nós dois e o mundo lá fora 🌊',
  },
  {
    id: 'lugar4',
    name: 'Lugar 4',
    emoji: '⭐',
    secretChar: 'R',
    imagePath: '/photos/lugar4.jpg',
    description: 'A melhor companhia do mundo...',
    memory: 'Com você tudo vira memória boa ⭐',
  },
]

// A senha correta é a concatenação de todos os secretChar em ordem
export const SECRET_PASSWORD = places.map(p => p.secretChar).join('')
