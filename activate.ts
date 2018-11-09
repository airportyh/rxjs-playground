import { Subscription, Observable } from "rxjs";
import moment = require("moment");
import * as $ from "jquery";
import { runInThisContext } from "vm";

class Subscriptions {
    data: Subscription[] = [];

    clear() {
        for (const sub of this.data) {
            sub.unsubscribe();
        }
    }

    add(observable: Observable<any>, fn: (value: any) => void): void {
        this.data.push(observable.subscribe(fn));
    }

}

const subscriptions = new Subscriptions();
let timeline: AnimatedTimeline;

export function activate(observable: Observable<any>): void {
    startAnimatedTimeline(observable);
    subscriptions.clear();
    subscriptions.add(observable, (value) => {
        const timestamp = moment().format('H:mm:ss');
        $("#transcript").append(`<span class="timestamp">${timestamp}: </span><span class="value">${value}</span><br>`);
    });
}

export function deactivate() {
    subscriptions.clear();
    timeline.stop();
}

interface ITick {
    tick: number;
    value: any
}

class AnimatedTimeline {
    context: CanvasRenderingContext2D;
    canvasWidth: number = 792;
    canvasHeight: number = 100;
    running: boolean = true;
    startTime: number;
    timeRange: number = 10000; // in ms
    dataPoints: ITick[] = [];
    subscription: Subscription;
    constructor(observable: Observable<any>) {
        this.startTime = new Date().getTime();
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) {
            throw new Error("Cannot find canvas element.");
        }
        const context = canvas.getContext("2d");;
        if (!context) {
            throw new Error("Cannot create graphics context.");
        }
        this.context = context;
        this.subscription = observable.subscribe((value) => {
            const now = new Date().getTime();
            const tick = now - this.startTime;
            this.dataPoints.push({ tick, value });
        });
    }

    start(): void {
        const render = () => {
            this.render();
            if (this.running) {
                requestAnimationFrame(render);
            } else {
                this.subscription.unsubscribe();
                $("#transcript").append("<span>Stopped animation.</span><br>");
            }
        }
        render();
    }

    stop(): void {
        this.running = false;
    }

    render(): void {
        const now = new Date().getTime();
        const timeDelta = now - this.startTime;
        const x = this.canvasWidth * timeDelta / this.timeRange;
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        for (let i = 1; i <= 10; i++) {
            this.context.fillStyle = '#ddd';
            const x = this.canvasWidth * i * 1000 / this.timeRange;
            this.context.fillRect(x, 0, 1, this.canvasHeight);
        }

        for (const dataPoint of this.dataPoints) {
            this.context.fillStyle = 'green';
            this.context.strokeStyle = 'black';
            this.context.beginPath();
            const x = this.canvasWidth * dataPoint.tick / this.timeRange;
            const y = 50;
            this.context.arc(x, y, 20, 0, Math.PI*2, true); 
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.font = '20px Helvetica';
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'white';
            this.context.fillText(String(dataPoint.value).substr(0, 5), x, y, 30);
        }

        this.context.fillStyle = 'red';
        this.context.fillRect(x, 0, 1, this.canvasHeight);
        if (timeDelta > this.timeRange) {
            this.running = false;
        }
    }
}

function startAnimatedTimeline(observable: Observable<any>) {
    timeline = new AnimatedTimeline(observable);
    timeline.start();
}