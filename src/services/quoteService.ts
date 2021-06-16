import { quoteRepo } from '../repositories/index';

export const quoteService = {
    async createQuote(reqBody) {
        return await quoteRepo.createQuote(reqBody);
    },
    async getAllQuotes() {
        return await quoteRepo.getAllQuotes();
    },
    async updateQuote(name, updateObject) {
        return await quoteRepo.updateQuote(name, updateObject);
    },
    async deleteQuote(id) {
        return await quoteRepo.deleteQuote(id);
    },
    async getOneByName(name) {
        return await quoteRepo.getOneByName(name)
    }
}