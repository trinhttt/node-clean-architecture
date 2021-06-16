import { userService, quoteService } from '../services/index';
import returnSuccess from '../utilities/successHandler'

export const quoteController = {
    async createQuote(req, res, next) {
        try {
            const newQuote: any = await quoteService.createQuote(req.body);
            const owner = newQuote?.owner ? await userService.getSingleUser(newQuote.owner) : {};
            await userService.addQuote(owner, newQuote);
            returnSuccess(201, res, 'New quote created successfully', newQuote)
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
            returnSuccess(200, res, 'Got list', allQuotes)
        } catch (error) {
            next(error);
        }
    },
    async updateQuote(req, res, next) {
        try {
            const name = req.params.name;
            const updateObject = req.body;
        
            const updateQuote = await quoteService.updateQuote(name, updateObject);
            returnSuccess(200, res, 'Quote was updated', updateObject)
        } catch (error) {
            next(error);
        }
    },
    async deleteQuote(req, res, next) {
        try {
            const id = req.params._id;
            const resultObject = await quoteService.deleteQuote(id);
            if (resultObject == null) {
                throw {
                    message: 'Can not find this quote',
                    status: 200
                }
            }
            returnSuccess(200, res, 'Quote was deleted', null)
        } catch (error) {
            next(error);
        }
    },
    async getOneByName(req, res, next) {
        try {
            const quote = await quoteService.getOneByName(req.params.name);
            returnSuccess(200, res, 'Got an user', quote);
        } catch (error) {
            next(error);
        }
    },
}
      
