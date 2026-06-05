import { Scene } from '../scenes/Scene.js';
import { StartScene } from '../scenes/StartScene.js';
import { WelcomeScene } from '../scenes/WelcomeScene.js';
import { OfficeScene } from '../scenes/OfficeScene.js';
import { OfficeGatherScene } from '../scenes/OfficeGatherScene.js';
import { OfficeQuestionScene } from '../scenes/OfficeQuestionScene.js';
import { OfficeCoffeeScene } from '../scenes/OfficeCoffeeScene.js';
import { OfficeStoryScene } from '../scenes/OfficeStoryScene.js';
import { OfficeAfterStoryScene } from '../scenes/OfficeAfterStoryScene.js';
import { OfficeToWifeScene } from '../scenes/OfficeToWifeScene.js';
import { WifeQuickScene } from '../scenes/WifeQuickScene.js';
import { WifeSympathyScene } from '../scenes/WifeSympathyScene.js';
import { WifeDirectScene } from '../scenes/WifeDirectScene.js';
import { WifeSilentScene } from '../scenes/WifeSilentScene.js';
import { WifeContinueScene } from '../scenes/WifeContinueScene.js';
import { WifeThreatTrueScene } from '../scenes/WifeThreatTrueScene.js';
import { WifeThreatJokeScene } from '../scenes/WifeThreatJokeScene.js';
import { WifeDetailsScene } from '../scenes/WifeDetailsScene.js';
import { CabinetScene } from '../scenes/CabinetScene.js';
import { SafeScene } from '../scenes/SafeScene.js';
import { FullSearchScene } from '../scenes/FullSearchScene.js';
import { HideoutsScene } from '../scenes/HideoutsScene.js';
import { BrotherCallScene } from '../scenes/BrotherCallScene.js';
import { BrotherMeetingScene } from '../scenes/BrotherMeetingScene.js';
import { MurderScene } from '../scenes/MurderScene.js';
import { MurderSceneTalkScene } from '../scenes/MurderSceneTalkScene.js';
import { NoIdeaScene } from '../scenes/NoIdeaScene.js';
import { CipherScene } from '../scenes/CipherScene.js';
import { DinnerAgreeScene, DinnerDeclineScene } from '../scenes/DinnerScene.js';
import { DinnerAgreeAltScene } from '../scenes/DinnerAgreeAltScene.js';
import { ShareWithInternScene } from '../scenes/ShareWithInternScene.js';
import { SurveillanceScene } from '../scenes/SurveillanceScene.js';
import { RaidScene } from '../scenes/RaidScene.js';
import { ArrestScene } from '../scenes/ArrestScene.js';
import { DealAcceptEndScene, DealRefuseScene } from '../scenes/DealEndings.js';
import { BadEndingPromolchatScene, BadEndingHomeScene, BadEndingRefuseScene } from '../scenes/BadEndingsScene.js';
import { ClockPuzzleScene } from '../scenes/ClockPuzzleScene.js';

export class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.registerScenes();
    }
    
    registerScenes() {
        this.register(new StartScene());
        this.register(new WelcomeScene());
        this.register(new OfficeScene());
        this.register(new OfficeGatherScene());
        this.register(new OfficeQuestionScene());
        this.register(new OfficeCoffeeScene());
        this.register(new OfficeStoryScene());
        this.register(new OfficeAfterStoryScene());
        this.register(new OfficeToWifeScene());
        this.register(new WifeQuickScene());
        this.register(new WifeSympathyScene());
        this.register(new WifeDirectScene());
        this.register(new WifeSilentScene());
        this.register(new WifeContinueScene());
        this.register(new WifeThreatTrueScene());
        this.register(new WifeThreatJokeScene());
        this.register(new WifeDetailsScene());
        this.register(new CabinetScene());
        this.register(new SafeScene());
        this.register(new FullSearchScene());
        this.register(new HideoutsScene());
        this.register(new BrotherCallScene());
        this.register(new BrotherMeetingScene());
        this.register(new MurderScene());
        this.register(new MurderSceneTalkScene());
        this.register(new NoIdeaScene());
        this.register(new CipherScene());
        this.register(new DinnerAgreeScene());
        this.register(new DinnerDeclineScene());
        this.register(new DinnerAgreeAltScene());
        this.register(new ShareWithInternScene());
        this.register(new SurveillanceScene());
        this.register(new RaidScene());
        this.register(new ArrestScene());
        this.register(new DealAcceptEndScene());
        this.register(new DealRefuseScene());
        this.register(new BadEndingPromolchatScene());
        this.register(new BadEndingHomeScene());
        this.register(new BadEndingRefuseScene());
        this.register(new ClockPuzzleScene());
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