import { Title } from '../interfaces/title/title.interface';

export const TitleList: Title[] = [
  {id: 1, title: 'What is your name?',
    item: [
      {id: 1, title: 'Fix', item: [
          {id: 1, title: 'Dix', item: [
              {id: 1, title: 'Pix', answer: 'All right'},
              {id: 2, title: 'Hello2', answer: 'Answer 2'},
              {id: 3, title: 'Hello3', answer: 'Answer 3'}]
          },
          {id: 2, title: 'Hello2', answer: 'Answer 2'},
          {id: 3, title: 'Hello3', answer: 'Answer 3'}]
      },
      {id: 2, title: 'Hello2', answer: 'Answer 2'},
      {id: 3, title: 'Hello3', answer: 'Answer 3'}]
  },
  {id: 2, title: 'How are you?',
    item: [
      {id: 1, title: 'Hello4', item: [
          {id: 1, title: 'Pix', answer: 'All right'},
          {id: 2, title: 'Hello2', answer: 'Answer 2'},
          {id: 3, title: 'Hello3', answer: 'Answer 3'}]},
      {id: 2, title: 'Hello5', answer: 'Answer 5'},
      {id: 3, title: 'Hello6', answer: 'Answer 6'}]
  },
  {id: 3, title: 'How old are you?',
    item: [
      {id: 1, title: 'Hello7', answer: 'Answer 7'},
      {id: 2, title: 'Hello8', answer: 'Answer 8'},
      {id: 3, title: 'Hello9', answer: 'Answer 9'}]
  }
];
