export class LiftUpUtils {
  static _currentGlobalLoader: any;
  static _awaitRegister: any;

  static register(ref: HTMLDivElement) {
    this._currentGlobalLoader = ref;

    if (this._awaitRegister) {
      this._awaitRegister.forEach((e: any) => {
        const liftupId = this.open(e);
        return liftupId;
      });
      this._awaitRegister = null; //clear
    }
  }

  static open(props: any) {
    if (this._currentGlobalLoader) {
      const liftupId = this._currentGlobalLoader.open(props);

      return liftupId as string;
    }

    if (!this._awaitRegister) this._awaitRegister = [];
    this._awaitRegister.push(props);
  }

  static updateProps({ ...props }, liftupId: string) {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.updateProps({ ...props }, liftupId);
    }
  }

  static close(liftupId: string) {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.close(liftupId);
    }
  }

  static closeAll() {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.closeAll();
    }
  }
}
