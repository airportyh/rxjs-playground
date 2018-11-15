import { Subscription, Observable } from "rxjs";
import moment = require("moment");
import * as $ from "jquery";
import { runInThisContext } from "vm";
import { timingSafeEqual } from "crypto";

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
let timelines: AnimatedTimeline[] = [];
let timeOutId;
export function activate(...things: Array<Observable<any> | AnimatedTimeline>): void {
    const colors = [
        'rgb(130, 215, 54)',
        'rgb(255, 105, 70)',
        'rgb(62, 161, 203)',
        'rgb(255, 203, 70)'
    ];
    deactivate();
    $("#canvas-pane").html("");
    clearTranscript();
    const timeRange = 10000;
    for (let i = 0; i < things.length; i++) {
        const thing = things[i];
        if (thing instanceof Observable) {
            const observable = thing as Observable<any>;
            const color = colors[i % colors.length];
            const timeline = new AnimatedTimeline(color, timeRange);
            timeline.install();
            timeline.start();
            timelines.push(timeline);
            subscriptions.add(observable, (value) => {
                logToTranscript(value, color);
                timeline.addValue(value);
            });
        } else if (thing instanceof AnimatedTimeline) {
            const timeline = thing as AnimatedTimeline;
            timeline.install();
            timeline.start();
            timelines.push(timeline);
        }
    }
    timeOutId = setTimeout(deactivate, timeRange);
}

export function clearTranscript(): void {
    $("#transcript").html("");
}

export function logToTranscript(message: string, color: string = "inherit"): void {
    const timestamp = moment().format('H:mm:ss');
    $("#transcript").append(`<span class="timestamp">${timestamp}: </span><span class="value" style="background-color: ${color}">${message}</span><br>`);
}

export function deactivate(): void {
    if (timeOutId) {
        clearTimeout(timeOutId);
    }
    subscriptions.clear();
    for (const timeline of timelines) {
        if (timeline) {
            timeline.stop();
        }
    }
    timelines = [];
}

interface ITick {
    tick: number;
    value: any
}

export class AnimatedTimeline {
    context: CanvasRenderingContext2D;
    canvasWidth: number = 792;
    canvasHeight: number = 60;
    running: boolean = true;
    startTime: number;
    timeRange: number; // in ms
    dataPoints: ITick[] = [];
    color: string;
    constructor(color: string, timeRange: number = 10000) {
        this.timeRange = timeRange;
        this.color = color;
        this.startTime = new Date().getTime();
    }

    install(): void {
        const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
        canvas.width = this.canvasWidth;
        canvas.height = this.canvasHeight;
        $(canvas).appendTo("#canvas-pane");
        if (!canvas) {
            throw new Error("Cannot find canvas element.");
        }
        const context = canvas.getContext("2d");;
        if (!context) {
            throw new Error("Cannot create graphics context.");
        }
        this.context = context;
    }

    addValue(value: any): void {
        const now = new Date().getTime();
        const tick = now - this.startTime;
        this.dataPoints.push({ tick, value });
    }

    start(): void {
        const render = () => {
            this.render();
            if (this.running) {
                requestAnimationFrame(render);
            }
        }
        render();
    }

    stop(): void {
        this.running = false;
    }

    render(): void {
        const startOffset = 30;
        const now = new Date().getTime();
        const timeDelta = now - this.startTime;
        const x = this.canvasWidth * timeDelta / this.timeRange;
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

        // start line
        this.context.fillStyle = 'black';
        this.context.fillRect(startOffset, 0, 2, this.canvasHeight);

        // grid lines
        for (let i = 1; i <= 10; i++) {
            this.context.fillStyle = '#ddd';
            const x = startOffset + (this.canvasWidth - startOffset) * i * 1000 / this.timeRange;
            this.context.fillRect(x, 0, 1, this.canvasHeight);
        }

        // marbles
        for (const dataPoint of this.dataPoints) {
            this.context.fillStyle = this.color;
            this.context.strokeStyle = 'black';
            this.context.lineWidth = 2;
            this.context.beginPath();
            const x = startOffset + 
                (this.canvasWidth - startOffset) * 
                dataPoint.tick / this.timeRange;
            const y = this.canvasHeight / 2;
            this.context.arc(x, y, 20, 0, Math.PI*2, true); 
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
            this.context.font = '20px Helvetica';
            this.context.textBaseline = 'middle';
            this.context.textAlign = 'center';
            this.context.fillStyle = 'black';
            this.context.fillText(String(dataPoint.value).substr(0, 5), x, y, 30);
        }

        // red moving line
        this.context.fillStyle = 'red';
        this.context.fillRect(startOffset + x, 0, 1, this.canvasHeight);
    }
}