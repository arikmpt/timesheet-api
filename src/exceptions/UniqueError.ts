export default class UniqueError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
