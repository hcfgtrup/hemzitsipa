import { Scene } from '../scenes/Scene.js';
import { StartScene } from '../scenes/StartScene.js';
import { OfficeScene } from '../scenes/OfficeScene.js';
import { WifeInterviewScene } from '../scenes/WifeInterviewScene.js';
import { BrotherMeetingScene } from '../scenes/BrotherMeetingScene.js';
import { BrotherDeclineScene } from '../scenes/BrotherDeclineScene.js';
import { MurderScene } from '../scenes/MurderScene.js';
import { CipherScene } from '../scenes/CipherScene.js';
import { NoIdeaScene } from '../scenes/NoIdeaScene.js';
import { DinnerAgreeScene, DinnerDeclineScene } from '../scenes/DinnerScene.js';
import { CabinetScene } from '../scenes/CabinetScene.js';
import { SafeScene } from '../scenes/SafeScene.js';
import { FullSearchScene } from '../scenes/FullSearchScene.js';
import { BadEndingPromolchatScene, BadEndingHomeScene, BadEndingBrotherKillerScene, BadEndingRefuseScene } from '../scenes/BadEndingsScene.js';
import { JokeScene } from '../scenes/JokeScene.js';
import { ArrestScene } from '../scenes/ArrestScene.js';
import { DealAcceptEndScene, DealRefuseScene } from '../scenes/DealEndings.js';
import { SurveillanceScene } from '../scenes/SurveillanceScene.js';
import { RaidScene } from '../scenes/RaidScene.js';

export class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.registerScenes();
    }
    
    registerScenes() {
        this.register(new StartScene());
        this.register(new OfficeScene());
        this.register(new WifeInterviewScene());
        this.register(new BrotherMeetingScene());
        this.register(new BrotherDeclineScene());
        this.register(new MurderScene());
        this.register(new CipherScene());
        this.register(new NoIdeaScene());
        this.register(new DinnerAgreeScene());
        this.register(new DinnerDeclineScene());
        this.register(new CabinetScene());
        this.register(new SafeScene());
        this.register(new FullSearchScene());
        this.register(new BadEndingPromolchatScene());
        this.register(new BadEndingHomeScene());
        this.register(new BadEndingBrotherKillerScene());
        this.register(new BadEndingRefuseScene());
        this.register(new JokeScene());
        this.register(new ArrestScene());
        this.register(new DealAcceptEndScene());
        this.register(new DealRefuseScene());
        this.register(new SurveillanceScene());
        this.register(new RaidScene());
    }
    
    register(scene) {
        this.scenes.set(scene.id, scene);
    }
    
    getScene(sceneId) {
        if (sceneId === 'reset') return null;
        if (!this.scenes.has(sceneId)) {
            console.warn(`Scene ${sceneId} not found, falling back to start`);
            return this.scenes.get('start');
        }
        return this.scenes.get(sceneId);
    }
    
    processChoice(sceneId, choiceId, gameState, userInput = null) {
        const scene = this.getScene(sceneId);
        if (!scene) return 'reset';
        return scene.processChoice(choiceId, gameState, userInput);
    }
}