type ResponseTypes = 'success' | 'error' | 'warning';

interface Todo {
    id: number;
    activity: string;
    isDone: boolean;
}

interface Message {
    type: ResponseTypes;
    msg: string;
}

type BackgroundColor = `bg-${string}`;

type HoverColor = `hover:${string}`;

interface ToastColor {
    bgColor: BackgroundColor;
    btnHoverColor: HoverColor;
}

interface ToastElement {
    root: HTMLElement;
    body: HTMLElement;
    type: HTMLElement;
    message: HTMLElement;
    btn: HTMLButtonElement;
}
