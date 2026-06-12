export interface Place {
  id: string
  name: string
  emoji: string
  secretChar: string        // a letra/caractere que essa peça revela
  imagePath: string         // caminho da foto (ex: /photos/lugar1.jpg)
  description: string       // pequena descrição romântica do lugar
  memory: string            // memória especial do lugar
}

export interface PlaceWithInput extends Place {
  userInput: string
}
