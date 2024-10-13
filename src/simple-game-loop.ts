/**
 * 
 */

export interface iUpdateable {
    get isOn(): boolean;
    update(ms: number): void;
}

export default class SimpleGameLoop {

    private objectsToUpdate: iUpdateable[] = [];
    private running: boolean = false;
    private RAF: ReturnType<typeof requestAnimationFrame> | null = null;
    private previous: number = 0;
    private ms: number = 0;

    public add(obj: iUpdateable): void {
        this.objectsToUpdate.push(obj);
    }

    public start(): void {
        if (!this.running) {
            this.bindRAF();
            this.previous = 0;
            this.running = true;
        }
    }

    public stop(): void {
        if (this.running) {
            if (this.RAF) cancelAnimationFrame(this.RAF);
            this.RAF = null;
            this.running = false;
        }
    }

    private update(): void {
        this.updateMS();
        this.objectsToUpdate.forEach(obj => { if (obj.isOn) obj.update(this.ms) });
        this.bindRAF();
    }

    private updateMS(): void {
        const now = Date.now();
        if (!this.previous) {
            this.previous = now;
        }
        this.ms = now - this.previous;
        this.previous = now;
    }

    private bindRAF(): void {
        this.RAF = requestAnimationFrame(this.update.bind(this));
    }

}