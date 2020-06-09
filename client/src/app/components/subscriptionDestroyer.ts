import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class SubscriptionDestroyer implements OnDestroy {
  protected destroy$ = new Subject();

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
