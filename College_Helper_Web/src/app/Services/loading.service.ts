import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  async updateLoadingStatus(status: boolean): Promise<boolean> {
    if (!status) {
      this.setLoadingStatus(status);
      return false;
    } else {
      const res = await Promise.race([
        this.setLoadingStatus(status),
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(false);
          }, 5000);
        }),
      ]) as boolean; // Add type assertion here
      return res;
    }
  }

  private async setLoadingStatus(status: boolean) {
    await new Promise((resolve) => {
      setTimeout(() => {
        this.isLoading.next(status);
        if (status) {
          resolve(false);
        }
      });
    });
  }

  getLoadingStatus() {
    return this.isLoading.asObservable();
  }
}
