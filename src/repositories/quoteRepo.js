import Quote from '../models/quoteModel.js';
import mongoose from 'mongoose';

export const quoteRepo = {
    async createQuote(name, quote) {
        const newQuote = new Quote({
            _id: mongoose.Types.ObjectId(),
            name: name,
            quote: quote,
        });
        return new Promise((resolve, reject) => {
            newQuote
                .save()
                .then(newQuoteObj => resolve(newQuoteObj))
                .catch(error => reject(error));
        });
    },
    async getAllQuotes() {
        return new Promise((resolve, reject) => {
            Quote
                .find()
                .then(allQuotes => resolve(allQuotes))
                .catch(error => reject(error));
        });
    },
    async updateQuote(name, updateObject) {
        return new Promise((resolve, reject) => {
            Quote.
                findOneAndUpdate({ name: name }, updateObject)
                .exec()
                .then(() => resolve(updateObject))
                .catch(error => reject(error));
        });
    },
    async deleteQuote(id) {
        return new Promise((resolve, reject) => {
            Quote.
                findByIdAndRemove(id)
                .exec()
                .then((result) => {
                    console.log(result)
                    if (result == null) {
                        resolve({
                            success: false,
                            message: 'Can not find this quote',
                        })
                    } else {
                        resolve({
                            success: true,
                            message: 'Quote was deleted',
                        })
                    }
                })
                .catch(error => reject(error));
        });
    }
}