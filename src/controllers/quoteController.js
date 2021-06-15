import { userService, quoteService } from '../services/index.js';

export const quoteController = {
    async createQuote(req, res, next) {
        try {
            const newQuote = await quoteService.createQuote(req.body);
            const owner = newQuote?.owner ? await userService.getSingleUser(newQuote.owner) : {};
            await userService.addQuote(owner, newQuote);

            res.status(201).json({
                success: true,
                message: 'New quote created successfully',
                quote: newQuote,
            });
        } catch (error) {
            next(error);
            // res.status(500).json({
            //     success: false,
            //     message: 'Server error. Please try again.',
            //     error: error.message,
            // });
        }
    },
    async getAllQuotes(req, res, next) {
        try {
            const allQuotes = await quoteService.getAllQuotes();
            res.status(200).json({
                success: true,
                message: 'Got list',
                quote: allQuotes,
            });
        } catch (error) {
            next(error);
        }
    },
    async updateQuote(req, res, next) {
        try {
            const name = req.params.name;
            const updateObject = req.body;
        
            const updateQuote = await quoteService.updateQuote(name, updateObject);
            res.status(200).json({
                success: true,
                message: 'Quote was updated',
                quote: updateObject,
            });
        } catch (error) {
            next(error);
        }
    },
    async deleteQuote(req, res, next) {
        try {
            const id = req.params._id;
            const resultObject = await quoteService.deleteQuote(id);
            const success = resultObject == null ? false : true
            const message = resultObject == null ? 'Can not find this quote' : 'Quote was deleted'
            res.status(200).json({
                success: success,
                message: message,
            });
        } catch (error) {
            next(error);
        }
    },
    async getOneByName(req, res, next) {
        try {
            const quote = await quoteService.getOneByName(req.params.name);
            res.status(200).json({
                success: true,
                message: 'Got list',
                quote: quote,
            });
        } catch (error) {
            next(error);
        }
    },
}
      
