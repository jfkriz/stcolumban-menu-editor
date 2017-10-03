export class MenuDate {
  get entree(): string {
    return this._entrees.join(';');
  }
  set entree(entree: string) {
    this._entrees = entree.split(';');
  }

  private _entrees: string [];
  get entrees(): string [] {
    return this._entrees;
  }
  set entrees(entrees: string []) {
    this._entrees = entrees;
  }

  public veggie: string;
  public treat: string;
}