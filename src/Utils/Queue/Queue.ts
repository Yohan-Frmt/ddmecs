import { IQueue, IQueueItem } from '@/Utils/Queue/IQueue';

export class PriorityQueue<T> implements IQueue<T> {
  private _items: IQueueItem<T>[] = [];

  public get IsEmpty(): boolean {
    return this._items.length === 0;
  }

  public Enqueue(value: T, priority: number): void {
    this._items.push({ value, priority });
    this._items = this._items.sort((a, b) => a.priority - b.priority);
  }

  public Dequeue(): T {
    const item = this._items.shift();
    if (typeof item === 'undefined')
      throw new Error('Attempt to dequeue from an empty queue');
    return item.value;
  }
}
