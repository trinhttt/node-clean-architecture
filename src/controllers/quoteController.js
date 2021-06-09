import { quoteService } from '../services/index.js';
export const quoteController = {
    async createQuote(req, res, next) {
        try {
            const name = req.body.name;
            const quote = req.body.quote;
            const newQuote = await quoteService.createQuote(name, quote);
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
    }
}
      
