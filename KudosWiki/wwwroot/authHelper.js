async function getAccessToken(msalInstance, account) {
    try {
        const accessTokenRequest = {
            scopes: ["User.Read"], // Replace this with the scopes you need
            account: account
        };

        const accessTokenResponse = await msalInstance.acquireTokenSilent(accessTokenRequest);
        return accessTokenResponse.accessToken;
    } catch (error) {
        console.error("Error acquiring access token", error);
        return null;
    }
}

async function storeUserInIndexedDB(user, accessToken) {
    const db = await openDB('my-app-db', 1, {
        upgrade(db) {
            db.createObjectStore('user', { keyPath: 'id' });
        },
    });

    const userStore = db.transaction('user', 'readwrite').objectStore('user');
    await userStore.put({ id: user.id, user, accessToken });
}
