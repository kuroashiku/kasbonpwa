import { API_HOST } from "./Global";

export const imageKitAuth =  async () => {
    try {
        const response = await fetch(`${API_HOST}/images/auth`,{
            method: 'POST'
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};
