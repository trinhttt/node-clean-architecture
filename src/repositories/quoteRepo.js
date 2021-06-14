import Quote from '../models/quoteModel.js';
import mongoose from 'mongoose';

export const quoteRepo = {
    async createQuote(reqBody) {
        const { name, quote, owner } = reqBody
        const newQuote = new Quote({
            _id: mongoose.Types.ObjectId(),
            name: name,
            quote: quote,
            owner: owner
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
    },
    async getOneByName(name) {
        console.log("getOneByName")
        return await Quote
        .findOne({ name: name })
        // .populate('owner', 'username phone')
    }
}