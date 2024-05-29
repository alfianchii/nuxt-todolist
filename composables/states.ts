export const todos = useLocalStorage<Todo[]>('todos', []);
export const activity = ref<string>('');
export const toastColors = ref<ToastColor>();
export const isEdit = ref<boolean>(false);
export const message = ref<Message>({ type: 'error', msg: '' });
export const timeoutId = ref<NodeJS.Timeout>();

export const setMessage = (type: ResponseTypes, msg: string): Message =>
    (message.value = {
        type,
        msg,
    });

export const removeParticularClass = (str: string, element: HTMLElement) =>
    element.classList.forEach((className: string) =>
        className.startsWith(str) ? element.classList.remove(className) : null,
    );

export const getToastColors = (
    bgColor: BackgroundColor,
    btnHoverColor: HoverColor,
): ToastColor => ({
    bgColor,
    btnHoverColor,
});

export const generateToastElements = (): ToastElement => ({
    root: document.querySelector('#toast') as HTMLElement,
    body: document.querySelector('#toast-body') as HTMLElement,
    type: document.querySelector('#toast-type') as HTMLElement,
    message: document.querySelector('#toast-message') as HTMLElement,
    btn: document.querySelector('#toast-btn') as HTMLButtonElement,
});

export const hideToast = (toastColors: ToastColor) => {
    const toast: ToastElement = generateToastElements();

    toast.root.classList.remove('opacity-100');
    toast.root.classList.add('opacity-0');

    setTimeout(() => {
        toast.body.classList.remove(toastColors.bgColor);
        toast.btn.classList.remove(toastColors.btnHoverColor);
        toast.type.textContent = '';
        toast.message.textContent = '';
    }, TOAST_TRANSITION);
};

export const clearToast = (toast: ToastElement) => {
    removeParticularClass('bg-', toast.body);
    removeParticularClass('hover:', toast.btn);

    toast.type.textContent = '';
    toast.message.textContent = '';
};

export const activateToast = (toastColors: ToastColor, message: Message) => {
    if (timeoutId.value) clearTimeout(timeoutId.value);
    const toast: ToastElement = generateToastElements();
    clearToast(toast);

    toast.root.classList.remove('opacity-0');
    toast.root.classList.add('opacity-100');

    toast.body.classList.add(toastColors.bgColor);
    toast.btn.classList.add(toastColors.btnHoverColor);

    toast.type.textContent = message.type;
    toast.message.textContent = message.msg;

    toast.btn.addEventListener('click', () => hideToast(toastColors));

    timeoutId.value = setTimeout(() => hideToast(toastColors), TOAST_DURATION);
};
