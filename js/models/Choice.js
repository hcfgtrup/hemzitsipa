export class Choice {
    constructor(id, text, nextScene, consequences = {}, isInput = false, placeholder = '') {
        this.id = id;
        this.text = text;
        this.nextScene = nextScene;
        this.consequences = consequences;
        this.isInput = isInput;
        this.placeholder = placeholder;
    }
}