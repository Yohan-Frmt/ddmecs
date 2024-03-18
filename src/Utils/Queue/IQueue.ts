export interface IQueue<T> {
  IsEmpty: boolean;

  Enqueue(item: T, priority: number): void;

  Dequeue(): T;
}

export interface IQueueItem<T> {
  priority: number;
  value: T;
}
