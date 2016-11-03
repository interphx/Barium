import * as testSignal from './test-signal';
import * as testBitMask from './test-bitmask';
import * as testAspect from './test-aspect';
import * as testEntityManager from './test-entity-manager';
import * as testGameUpdater from './test-game-updater';

// TODO: Decouple tests from the main library, make it an external dependency

testSignal.test();
testBitMask.test();
testAspect.test();
testEntityManager.test();
testGameUpdater.test();
