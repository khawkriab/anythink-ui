export class PopupUtils {
    _currentGlobalLoader = null //reference variable
    _awaitRegister = null // popup list before register()

    static register(ref) {
        this._currentGlobalLoader = ref

        if (this._awaitRegister) {
            this._awaitRegister.forEach((e) => {
                const popupId = this.open(e)
                return popupId
            })
            this._awaitRegister = null //clear
        }
    }

    static open(props) {
        if (this._currentGlobalLoader) {
            const popupId = this._currentGlobalLoader.open(props)
            return popupId
        } else {
            if (!this._awaitRegister) this._awaitRegister = []

            this._awaitRegister.push(props)
        }
    }

    static updateProps({ ...props }, popupId) {
        if (this._currentGlobalLoader) {
            this._currentGlobalLoader.updateProps({ ...props }, popupId)
        }
    }

    static close(popupId) {
        if (this._currentGlobalLoader) {
            this._currentGlobalLoader.close(popupId)
        }
    }

    static closeAll() {
        if (this._currentGlobalLoader) {
            this._currentGlobalLoader.closeAll()
        }
    }
}
