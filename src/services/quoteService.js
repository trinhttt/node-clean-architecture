import { quoteRepo } from '../repositories/index.js';

export const quoteService = {
    async createQuote(name, quote) {
        return await quoteRepo.createQuote(name, quote);
    },
    async getAllQuotes() {
        return await quoteRepo.getAllQuotes();
    },
    async updateQuote(name, updateObject) {
        return await quoteRepo.updateQuote(name, updateObject);
    },
    async deleteQuote(id) {
        return await quoteRepo.deleteQuote(id);
    }
}