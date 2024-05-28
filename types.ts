type ResponseTypes = 'success' | 'error';

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

interface ToastColors {
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
