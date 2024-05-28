export const errorMessage = (msg: string): Message => {
    return {
        type: 'error',
        msg,
    };
};

export const removeParticularClass = (str: string, element: HTMLElement) =>
    element.classList.forEach((className: string) =>
        className.startsWith(str) ? element.classList.remove(className) : null,
    );

export const getToastColors = (
    bgColor: BackgroundColor,
    btnHoverColor: HoverColor,
): ToastColors => ({
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

export const hideToast = (toastColors: ToastColors) => {
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

export const activateToast = (
    toastColors: ToastColors,
    message: Message,
): NodeJS.Timeout => {
    const toast: ToastElement = generateToastElements();
    clearToast(toast);

    toast.root.classList.remove('opacity-0');
    toast.root.classList.add('opacity-100');

    toast.body.classList.add(toastColors.bgColor);
    toast.btn.classList.add(toastColors.btnHoverColor);

    toast.type.textContent = message.type;
    toast.message.textContent = message.msg;

    toast.btn.addEventListener('click', () => hideToast(toastColors));

    return setTimeout(() => hideToast(toastColors), TOAST_DURATION);
};
