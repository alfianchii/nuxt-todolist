interface Todo {
    id: number;
    activity: string;
    isDone: boolean;
}

interface Message {
    type: 'success' | 'error';
    msg: string;
}
