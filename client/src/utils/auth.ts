export const getToken = () => {
    const match = document.cookie;
    console.log(match);
    return match ? match[2] : null;
};

export const setToken = (token: string) => {
    document.cookie = `token=${token}; path=/; secure; HttpOnly;`;
};

export const removeToken = () => {
    document.cookie = 'token=; Max-Age=0; path=/; secure; HttpOnly;';
};