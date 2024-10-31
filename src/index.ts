/**
 * package barrel file
 */

export interface iUpdateable {
    update(ms: number): void;
}

export { SimpleGameLoop } from './simple-game-loop.js';