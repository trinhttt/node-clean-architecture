import Quote from '../models/quoteModel.js';
import mongoose from 'mongoose';

export const quoteRepo = {
    async createQuote(name, quote) {
        const newQuote = new Quote({
            _id: mongoose.Types.ObjectId(),
            name: name,
            quote: quote,
        });
        return await newQuote.save();
    },
    async getAllQuotes() {
        return await Quote.find();
    },
    async updateQuote(name, updateObject) {
        return await Quote.findOneAndUpdate({ name: name }, updateObject)
    },
    async deleteQuote(id) {
        return await Quote.findByIdAndRemove(id);
    }
}