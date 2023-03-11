import {Clan, Client, Player} from "clashofclans.js";
import env from 'dotenv'

env.config()

const client = new Client({
    keys: [process.env.API_TOKEN],
    cache: true,
    retryLimit: 2,
    restRequestTimeout: 5000,
});

export const getClan = async (tag: string): Promise<Clan> => {
    return await client.getClan(tag);
}

export const getPlayer = async (tag: string): Promise<Player> => {
    return await client.getPlayer(tag);
}