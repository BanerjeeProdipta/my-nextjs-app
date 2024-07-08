import React from 'react';
import BookCard from './BookCard';
import { Book } from '@/types';
import { books } from '@/utils/data';

const booksByCategories: Record<string, Book[]> = {};

books.forEach((book) => {
  if (!booksByCategories[book.category]) {
    booksByCategories[book.category] = [];
  }
  booksByCategories[book.category].push(book);
});

const categories = Object.keys(booksByCategories);

const BookByCategories: React.FC = () => {
  return (
    <div className="flex lg:flex-wrap mx-auto flex-col justify-between w-full items-center lg:p-12">
      {categories.map((category) => (
        <div key={category} className="mb-8 w-full">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold mb-4 text-gray-800">{category}</h2>
            <button className="text-gray-500 text-xs">
              View all {'>'}
              {'>'}
            </button>
          </div>

          <div className="flex mx-auto lg:px-20  justify-center items-center lg:justify-between flex-wrap">
            {booksByCategories[category].map((book) => (
              <div key={book.id}>
                <BookCard {...book} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookByCategories;
