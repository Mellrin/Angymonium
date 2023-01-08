export interface IQuest {
  id: number,
  title: string,
  status: string,
  description: string,
  rating?: number | null,
  complexity: number,
  banner: string,
  host: string,
  feedbacks: Array<IFeedback>,
  timeslots?: Array<Date>
}

export interface IFeedback {
  author: string,
  score: number,
  time: Date,
  text: string
}

export interface IBooking {
  name: string,
  quest: number,
  timeslot: Date,
  comment: string
}

export class Feedback implements IFeedback {
  author: string
  score: number
  time: Date
  text: string

  constructor(author: string, score: number, time: Date, text: string) {
    this.author = author
    this.score = score
    this.time = time
    this.text = text
  }
  //parse from BE
  //parse to BE
}