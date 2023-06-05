const express = require('express')
const router = express.Router()

const User = require('../models/userModel');
const Book = require('../models/addBookModel');

const requireAuth = require('../middlewares/requireAuth')
router.use(requireAuth)



async function getBookRecommendations(userId, numRecommendations) {
    // Retrieve user's search and purchase history
    const user = await User.findById(userId).populate('searchHistory').populate('purchaseHistory');
    
    // Collect book ids from search and purchase history
    const bookIds = [];
    user.searchHistory.forEach(query => bookIds.push(query.book));
    // user.purchaseHistory.forEach(query => bookIds.push(query.book));
  
    // Retrieve book information for each book in the user's search and purchase history
    const books = await Book.find({ _id: { $in: bookIds } });
  
    // Create a map of authors and categories with books as values
    const authorsMap = new Map();
    const categoriesMap = new Map();
    books.forEach(book => {
      if (!authorsMap.has(book.author)) {
        authorsMap.set(book.author, []);
      }
      authorsMap.get(book.author).push(book);
  
      if (!categoriesMap.has(book.category)) {
        categoriesMap.set(book.category, []);
      }
      categoriesMap.get(book.category).push(book);
    });
  
    // Find similar books based on author and category
    const similarBooks = [];
    books.forEach(book => {
      const authorBooks = authorsMap.get(book.author) || [];
      const categoryBooks = categoriesMap.get(book.category) || [];
      const similarBooksSet = new Set([...authorBooks, ...categoryBooks]);
      similarBooksSet.delete(book);
      similarBooks.push(...similarBooksSet);
    });
  
    // Sort similar books based on search and purchase count
  //   similarBooks.sort((a, b) => (b.searchCount + b.purchaseCount) - (a.searchCount + a.purchaseCount));
  
    // Return the top N recommendations
    return similarBooks.slice(0, numRecommendations);
  }
  

  router.get('/recommend-books', getBookRecommendations);