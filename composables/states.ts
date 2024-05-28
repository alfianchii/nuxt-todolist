export const errorMessage = (msg: string) => {
    return {
        type: 'error',
        msg,
    };
};
