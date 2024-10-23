/**
 * package barrel file
 */

export interface iUpdateable {
    turnOn(): void;
    turnOff(): void;
    update(ms: number): void;
}

export { SimpleGameLoop } from './simple-game-loop.js';